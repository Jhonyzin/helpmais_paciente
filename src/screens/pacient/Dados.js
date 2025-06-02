import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dados() {
  const API_URL = 'https://backend-811v.onrender.com/usuario';
  const [carregando, setCarregando] = useState(true);

  const [usuario, setUsuario] = useState({
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
        console.error('Erro ao buscar dados do usuário:', error);
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
        { label: 'Nome', value: usuario.nome },
        { label: 'Email', value: usuario.email },
        { label: 'Telefone', value: usuario.telefone },
        { label: 'Data de Nascimento', value: usuario.data_nascimento },
        { label: 'CEP', value: usuario.cep },
        { label: 'Estado', value: usuario.estado },
        { label: 'Cidade', value: usuario.cidade },
        { label: 'Bairro', value: usuario.bairro },
        { label: 'Logradouro', value: usuario.logradouro },
        { label: 'Número', value: usuario.numero },
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
