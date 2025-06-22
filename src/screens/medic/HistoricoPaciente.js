import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Alert, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import icons from '../../constants/icons.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles.js';
import { useRoute, useNavigation } from '@react-navigation/native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

export default function HistoricoPaciente() {
  const navigation = useNavigation();
  const [consultaId, setConsultaId] = useState('');
  const [loadingNfc, setLoadingNfc] = useState(false);

  // Função para navegar para InformacoesConsulta com o ID digitado
  const handleVisualizarConsulta = () => {
    if (!consultaId) {
      Alert.alert('Atenção', 'Digite o ID da consulta.');
      return;
    }
    navigation.navigate('InformacoesConsulta', { consulta_id: consultaId });
  };

  // Função para ler NFC e buscar paciente pelo UID
  const handleScanNfc = async () => {
    setLoadingNfc(true);
    try {
      if (!await NfcManager.isSupported()) {
        Alert.alert('Erro', 'Seu dispositivo não suporta NFC');
        return;
      }
      if (!await NfcManager.isEnabled()) {
        Alert.alert('Erro', 'Ative o NFC nas configurações');
        return;
      }
      await NfcManager.start();
      await NfcManager.requestTechnology(NfcTech.NfcA);
      const tag = await NfcManager.getTag();
      await NfcManager.cancelTechnologyRequest();
      if (!tag?.id) throw new Error('UID não encontrado');
      let uid = '';
      if (Array.isArray(tag.id)) {
        uid = tag.id.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      } else if (typeof tag.id === 'string') {
        uid = tag.id.replace(/[^0-9A-F]/g, '').toUpperCase();
      } else {
        throw new Error('Formato de UID inválido');
      }
      if (!uid || uid.length < 4) throw new Error('UID muito curto');
      // Buscar paciente pelo UID
      const response = await axios.post('https://backend-811v.onrender.com/usuario/loginNfc', { uid });
      const pacienteId = response.data?.user?.id || response.data?.user?.usuario_id;
      if (!pacienteId) throw new Error('Paciente não encontrado para este UID');
      // Navegar para tela de consultas do paciente
      navigation.navigate('Consultas', { pacienteId });
    } catch (err) {
      console.error('Erro ao ler NFC:', err);
      Alert.alert('Erro', err.message || 'Falha ao ler NFC');
    } finally {
      setLoadingNfc(false);
      try { await NfcManager.cancelTechnologyRequest(); } catch (e) {}
    }
  };

  return (
    <View style={[styles.container, { padding: 20 }]}> 
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Histórico do Paciente</Text>
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>Digite o ID da consulta:</Text>
        <TextInput
          style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10, color: '#333' }}
          value={consultaId}
          onChangeText={setConsultaId}
          placeholder="ID da consulta"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={[styles.botao, { marginBottom: 10 }]} onPress={handleVisualizarConsulta}>
          <Text style={styles.textoBotao}>Visualizar Consulta</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity style={styles.botao} onPress={handleScanNfc} disabled={loadingNfc}>
          <Text style={styles.textoBotao}>{loadingNfc ? 'Lendo NFC...' : 'Scanear com NFC'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}