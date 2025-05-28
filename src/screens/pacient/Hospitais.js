import { View, Text, PermissionsAndroid, Platform } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { styles } from "../styles";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';

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
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  }

  async function buscarHospitaisProximos(lat, lng) {
    const url = `https://backend-811v.onrender.com/localizacao/hospitais?lat=${lat}&lng=${lng}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (Array.isArray(data)) {
        setHospitais(data);
      }
    } catch (error) {
      console.error('Erro ao buscar hospitais:', error);
    }
  }

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal: 20, backgroundColor: '#1c2c41' },
      ]}
    >
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
          zoomControlEnabled={true}
        >
          {hospitais.map((hosp, index) => {
            const lat = hosp?.geometry?.location?.lat;
            const lng = hosp?.geometry?.location?.lng;
            if (lat != null && lng != null) {
              return (
                <Marker
                  key={index}
                  coordinate={{ latitude: lat, longitude: lng }}
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
