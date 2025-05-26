import { View,Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { styles } from "../styles";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export default function Hospitais() {
  const [location, setLocation] = useState(null);
  const [hospitais, setHospitais] = useState();
  const navigation = useNavigation();
  


    
  
  async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('não vai');
      }

      Geolocation.getCurrentPosition(
        async position => {
          const coords = position.coords;
          borabuscar(coords.latitude, coords.longitude);
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }
    
  async function borabuscar(lat, lng) {
    const key = 'AIzaSyCFfwmr1Knx1geRlD4eipzbQ-GqLJQFmpE';
    const radius = 3000;
    const tipo = 'hospital';

    const url =
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${tipo}&key=${key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        setHospitais(data.results);
      }
    } catch (error) {
      console.error(
        'Tivemos um erro ao buscar os hospitais, o erro é o:',
        error,
      );
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);


    return (
      <View
        style={[
          styles.container,
          {paddingHorizontal: 20, backgroundColor: '#1c2c41'},
        ]}>
        {location && (
          <MapView
            style={styles.maps}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 1,
              longitudeDelta: 1,
            }}
            zoomEnabled={true}
            zoomControlEnabled={true}>
            {Array.isArray(hospitais) &&
              hospitais.map((hosp, index) => {
                if (
                  hosp?.geometry?.location?.lat != null &&
                  hosp?.geometry?.location?.lng != null
                ) {
                  return (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: hosp.geometry.location.lat,
                        longitude: hosp.geometry.location.lng,
                      }}
                      title={hosp.name}
                      description={hosp.vicinity}
                    />
                  );
                }
              })}
          </MapView>
        )}
      </View>
    );
}