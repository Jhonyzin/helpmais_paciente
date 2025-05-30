import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const API_URL = 'https://backend-811v.onrender.com';

export default function Pulseira() {
  useEffect(() => {
    NfcManager.start();
  }, []);

  const cadastrarPulseira = async () => {
    try {
      const cpf = await AsyncStorage.getItem('cpf'); 
      if (!cpf) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();

      const uid = tag?.id;
      if (!uid) {
        Alert.alert('Erro', 'UID não encontrado.');
        return;
      }

      const response = await axios.post(`${API_URL}/usuario/cadastroNFC`, {
        cpf,
        uid,
      });

      Alert.alert('Sucesso', response.data.message);
    } catch (error) {
      console.warn(error);
      Alert.alert('Erro', error.response?.data?.message || 'Falha ao cadastrar pulseira.');
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={[styles.container, styles.fundo]}>
      <Text style={[styles.textocinza, { marginTop: 30, fontSize: 20 }]}>Cadastro da Pulseira NFC</Text>

      <TouchableOpacity style={styles.botao} onPress={cadastrarPulseira}>
        <Text style={styles.textoBotao}>Cadastrar Pulseira</Text>
      </TouchableOpacity>
    </View>
  );
}
