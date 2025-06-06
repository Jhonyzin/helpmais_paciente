import { View, Text, PermissionsAndroid, Platform, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Geolocation from "@react-native-community/geolocation";

import icons from "../../constants/icons";
import {styles} from '../styles';


export default function Hospitais() {
  const [location, setLocation] = useState(null);
  const [hospitais, setHospitais] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    requestLocationPermission();
  }, []);
  

  async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissão de localização negada');
        return;
      }
    }

    Geolocation.getCurrentPosition(
      async position => {
        const coords = position.coords;
        buscarHospitaisProximos(coords.latitude, coords.longitude);
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

  async function buscarHospitaisProximos(lat, lng) {
    const url = `https://backend-811v.onrender.com/localizacao/hospitais?lat=${lat}&lng=${lng}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log('Hospitais retornados:', data);
      if (data.results && Array.isArray(data.results)) {
        setHospitais(data.results);
      } else {
        console.warn('Resposta inesperada da API:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar hospitais:', error);
    }
  }
  

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
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          zoomEnabled={true}
          zoomControlEnabled={true}>

          {hospitais.map((hosp, index) => {
            const lat = hosp?.geometry?.location?.lat;
            const lng = hosp?.geometry?.location?.lng;
            if (lat != null && lng != null) {
              return (
                <Marker
                  key={index}
                  coordinate={{latitude: lat, longitude: lng}}
                  title={hosp.name}
                  description={hosp.vicinity}>
                  <Image
                    source={icons.iconmaps}
                    style={{height: 30, width: 30}}
                    resizeMode="contain"
                  />
                </Marker>
              );
            }
          })}
        </MapView>
      )}
    </View>
  );
}