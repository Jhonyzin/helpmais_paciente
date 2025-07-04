import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Botaoconsultas from '../../components/consultas';
import { styles } from '../styles';

export default function HistoricoMedico() {
  const navigation = useNavigation();
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMedico, setIsMedico] = useState(false);

  useEffect(() => {
    async function carregarConsultas() {
      console.log('Iniciando carregamento de consultas...');
      try {
        const token = await AsyncStorage.getItem('userToken');
        const tipo = await AsyncStorage.getItem('userType');
        console.log('Token encontrado:', token);
        if (!token) {
          console.warn('Token não encontrado');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          'https://backend-811v.onrender.com/consulta/medico',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Consultas recebidas:', response.data);

        const dados = response.data.map(item => ({
          consulta_id: item.consulta_id,
          nome: item.nome,
          imagem_perfil: item.imagem_perfil ? { uri: item.imagem_perfil } : null,
          status: item.status,
          horario: formatarHorario(item.data_hora),
          tempo: calcularTempoPassado(item.data_hora),
          valor: item.valor || 'gratuita',
          corbarra: getCorBarra(item.status),
          data_hora: item.data_hora
        }));

        setConsultas(dados);
        setIsMedico(tipo === 'medico');
      } catch (error) {
        console.error('Erro ao carregar consultas:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarConsultas();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#004aad" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.historicocontainer}>
      {consultas.map((consulta) => (
        <Botaoconsultas
          key={consulta.consulta_id}
          {...consulta}
          onPress={() => navigation.navigate('InformacoesMedico', { consulta })}
        />
      ))}
    </ScrollView>
  );
}

function formatarHorario(dataHoraStr) {
  const data = new Date(dataHoraStr);
  const horas = data.getHours().toString().padStart(2, '0');
  const minutos = data.getMinutes().toString().padStart(2, '0');
  return `${horas}:${minutos}`;
}

function calcularTempoPassado(dataHoraStr) {
  const agora = new Date();
  const dataConsulta = new Date(dataHoraStr);
  const diffMs = agora - dataConsulta;
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias < 1) return 'Hoje';
  if (diffDias === 1) return 'Ontem';
  if (diffDias < 30) return `${diffDias} dias`;
  const meses = Math.floor(diffDias / 30);
  return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
}

function getCorBarra(status) {
  switch (status?.toLowerCase()) {
    case 'concluída':
      return '#7ed957';
    case 'agendada':
      return '#ffde59';
    case 'cancelada':
      return '#ff0000';
    default:
      return '#a6a6a6';
  }
}
