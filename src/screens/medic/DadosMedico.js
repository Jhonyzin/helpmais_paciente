import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DadosMedico() {
  const API_URL = 'https://backend-811v.onrender.com/medico';
  const [carregando, setCarregando] = useState(true);

  const [medico, setUsuario] = useState({
    email: '',
    telefone: '',
    data_nascimento: '',
    nome: '',
    cep: '',
    estado: '',
    cidade: '',
    bairro: '',
    logradouro: '',
    numero: '',
  });

  useEffect(() => {
    async function buscarDados() {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do medico:', error);
      } finally {
        setCarregando(false);
      }
    }

    buscarDados();
  }, []);

  if (carregando) {
    return (
      <View style={[styles.container, { backgroundColor: '#1c2c41', justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#1c2c41' }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
    >
      <Text style={[styles.texto, { fontSize: 24, marginBottom: 20 }]}>Dados do Paciente</Text>

      {[
        { label: 'Nome', value: medico.nome },
        { label: 'Email', value: medico.email },
        { label: 'Telefone', value: medico.telefone },
        { label: 'Data de Nascimento', value: medico.data_nascimento },
        { label: 'CEP', value: medico.cep },
        { label: 'Estado', value: medico.estado },
        { label: 'Cidade', value: medico.cidade },
        { label: 'Bairro', value: medico.bairro },
        { label: 'Logradouro', value: medico.logradouro },
        { label: 'Número', value: medico.numero },
      ].map((item, index) => (
        <View key={index} style={{ marginBottom: 10, width: '100%' }}>
          <Text style={[styles.texto, { color: '#a6a6a6', fontSize: 14 }]}>{item.label}</Text>
          <View style={[styles.inputContainer, { backgroundColor: '#fff' }]}>
            <Text style={styles.textocinza}>{item.value || '---'}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
