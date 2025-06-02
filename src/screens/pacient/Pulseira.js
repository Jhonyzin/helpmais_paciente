import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

const API_URL = 'https://backend-811v.onrender.com';

export default function Pulseira() {
  const [registerLoading, setRegisterLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [nfcStatus, setNfcStatus] = useState({ hasNFC: false, uid: null });
  const [fetchingStatus, setFetchingStatus] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const supported = await NfcManager.isSupported();
        setIsSupported(supported);
        if (!supported) return;

        await NfcManager.start();

        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          Alert.alert('Erro', 'Usuário não autenticado');
          return;
        }
        setUserToken(token);

        await fetchNfcStatus(token);
      } catch (error) {
        console.warn('Erro na inicialização do NFC:', error);
      } finally {
        setFetchingStatus(false);
      }
    };

    init();

    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  }, []);

  const fetchNfcStatus = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/usuario`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.nfc_uid) {
        setNfcStatus({ hasNFC: true, uid: response.data.nfc_uid });
      } else {
        setNfcStatus({ hasNFC: false, uid: null });
      }
    } catch (error) {
      console.error('Erro ao buscar status do NFC:', error);
      Alert.alert('Erro', 'Não foi possível verificar o status da pulseira');
    }
  };

  const cadastrarPulseira = async () => {
    if (!userToken) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    setRegisterLoading(true);

    try {
      const enabled = await NfcManager.isEnabled();
      if (!enabled) {
        Alert.alert('Erro', 'Por favor, ative o NFC nas configurações');
        return;
      }

      await NfcManager.requestTechnology(NfcTech.NfcA);
      const tag = await NfcManager.getTag();

      if (!tag || !tag.id) {
        Alert.alert('Erro', 'Nenhuma pulseira detectada. Tente novamente.');
        return;
      }

      const uid = tag.id;

      const response = await axios.post(
        `${API_URL}/usuario/cadastroNFC`,
        { uid },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      Alert.alert('Sucesso', response.data.message);
      await fetchNfcStatus(userToken);
    } catch (error) {
      console.error('Erro no cadastro NFC:', error);
      const errorMsg =
        error?.response?.data?.message || error.message || 'Falha ao cadastrar pulseira';
      Alert.alert('Erro', errorMsg);
    } finally {
      NfcManager.cancelTechnologyRequest();
      setRegisterLoading(false);
    }
  };

  const removerNFC = async () => {
    if (!userToken) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    setRemoveLoading(true);

    try {
      const response = await axios.delete(`${API_URL}/usuario/removerNFC`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      Alert.alert('Sucesso', response.data.message);
      await fetchNfcStatus(userToken);
    } catch (error) {
      console.error('Erro ao remover NFC:', error);
      const errorMsg =
        error?.response?.data?.message || error.message || 'Falha ao remover pulseira';
      Alert.alert('Erro', errorMsg);
    } finally {
      setRemoveLoading(false);
    }
  };

  if (fetchingStatus) {
    return (
      <View style={[styles.container, styles.fundo]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.textocinza}>Carregando informações...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.fundo]}>
      <Text style={[styles.textocinza, { marginTop: 30, fontSize: 20 }]}>
        Gerenciamento da Pulseira NFC
      </Text>

      {!isSupported && (
        <Text style={[styles.textocinza, { color: 'red', marginTop: 10 }]}>
          Este dispositivo não suporta NFC.
        </Text>
      )}

      <View style={{ marginVertical: 20 }}>
        <Text style={styles.textocinza}>
          Status: {nfcStatus.hasNFC ? 'Pulseira cadastrada' : 'Nenhuma pulseira cadastrada'}
        </Text>
        {nfcStatus.hasNFC && (
          <Text style={styles.textocinza}>UID: {nfcStatus.uid}</Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.botao,
          (!isSupported || registerLoading || nfcStatus.hasNFC) && styles.botaoDesabilitado,
        ]}
        onPress={cadastrarPulseira}
        disabled={!isSupported || registerLoading || nfcStatus.hasNFC}
      >
        {registerLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>
            {nfcStatus.hasNFC ? 'Pulseira já cadastrada' : 'Cadastrar Pulseira'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.botao,
          (removeLoading || !nfcStatus.hasNFC) && styles.botaoDesabilitado,
          { marginTop: 20 },
        ]}
        onPress={removerNFC}
        disabled={removeLoading || !nfcStatus.hasNFC}
      >
        {removeLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>Remover Pulseira</Text>
        )}
      </TouchableOpacity>

      <Text style={[styles.textocinza, { marginTop: 20, fontSize: 13 }]}>
        Aproxime a pulseira do leitor quando solicitado.
      </Text>
    </View>
  );
}
