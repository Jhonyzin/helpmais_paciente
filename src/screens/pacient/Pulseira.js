import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

const API_URL = 'https://backend-811v.onrender.com';

export default function Pulseira() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    NfcManager.start();
  }, []);

  const cadastrarPulseira = async () => {
    setLoading(true);

    try {
      await NfcManager.requestTechnology(NfcTech.NfcA);
      const tag = await NfcManager.getTag();

      const uid = tag?.id;
      if (!uid) {
        Alert.alert('Erro', 'UID não encontrado.');
        return;
      }

      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.post(
        `${API_URL}/usuario/cadastroNFC`,
        { uid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Sucesso', response.data.message);
    } catch (error) {
      console.warn(error);
      Alert.alert('Erro', error.response?.data?.message || 'Falha ao cadastrar pulseira.');
    } finally {
      NfcManager.cancelTechnologyRequest();
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, styles.fundo]}>
      <Text style={[styles.textocinza, { marginTop: 30, fontSize: 20 }]}>
        Cadastro da Pulseira NFC
      </Text>

      <TouchableOpacity style={styles.botao} onPress={cadastrarPulseira} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>Cadastrar Pulseira</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
