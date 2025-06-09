import { View, Text, PermissionsAndroid, Platform, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Geolocation from "@react-native-community/geolocation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      console.log('Permissão de localização concedida');
    }

    Geolocation.getCurrentPosition(
      async position => {
        const coords = position.coords;
        console.log('Localização obtida:', coords);
        buscarHospitaisProximos(coords.latitude, coords.longitude);
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      error => {
        console.log('Erro ao obter localização:', error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  async function buscarHospitaisProximos(lat, lng) {
    const url = `https://backend-811v.onrender.com/localizacao/hospitais?lat=${lat}&lng=${lng}`;
    console.log('URL da busca:', url);
    
    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log('Resposta da API:', data);
      if (data.results && Array.isArray(data.results)) {
        console.log('Número de hospitais encontrados:', data.results.length);
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
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          zoomControlEnabled={true}>

          {/* Marcador da localização atual */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            title="Sua localização"
            pinColor="blue"
          />

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
                  <View style={{ 
                    backgroundColor: '#fff', 
                    padding: 5, 
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: '#ff0000'
                  }}>
                    <Image
                      source={icons.iconmaps}
                      style={{height: 24, width: 24}}
                      resizeMode="contain"
                    />
                  </View>
                  <Callout tooltip>
                    <View style={{ 
                      padding: 10, 
                      width: 200,
                      backgroundColor: 'white',
                      borderRadius: 6,
                      borderWidth: 1,
                      borderColor: '#ccc'
                    }}>
                      <Text style={{ 
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                        textAlign: 'left',
                        width: '100%'
                      }}>
                        {hosp.name}
                      </Text>
                      <Text style={{
                        fontSize: 14,
                        color: '#666',
                        marginTop: 4,
                        textAlign: 'left',
                        width: '100%'
                      }}>
                        {hosp.vicinity}
                      </Text>
                    </View>
                  </Callout>
                </Marker>
              );
            }
          })}
        </MapView>
      )}
    </View>
  );
}