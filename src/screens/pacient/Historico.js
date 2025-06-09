import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Botaoconsultas from '../../components/consultas';
import { styles } from '../styles';

export default function Historico() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarConsultas() {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.warn('Token não encontrado');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          'https://backend-811v.onrender.com/consulta',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const dados = response.data.map(item => ({
          id: item.id,
          nome: item.nome,
          especialidade: item.especialidade || 'Não informado',
          imagem_perfil: item.imagem_perfil ? { uri: item.imagem_perfil } : null,
          status: item.status,
          horario: formatarHorario(item.data_hora),
          tempo: calcularTempoPassado(item.data_hora),
          valor: item.valor || 'gratuita',
          corbarra: getCorBarra(item.status),
          data_hora: item.data_hora
        }));

        setConsultas(dados);
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
        <Botaoconsultas key={consulta.id} {...consulta} />
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
    case 'concluida':
      return '#7ed957';
    case 'em andamento':
      return '#ffde59';
    case 'encerrada':
      return '#ff0000';
    case 'cancelada':
      return '#808080';
    default:
      return '#a6a6a6';
  }
}
