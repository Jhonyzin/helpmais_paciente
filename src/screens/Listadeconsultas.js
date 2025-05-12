import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { styles } from "./styles";
import Botaoconsultas from "../constants/consultas";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://backend-811v.onrender.com';

export default function HistoricoConsultas({ filtro }) {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarConsultas = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${API_URL}/consultas`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        let dados = response.data;

        if (filtro === 'andamento') {
          dados = dados.filter(item => item.status === 'andamento');
        } else if (filtro === 'encerrada') {
          dados = dados.filter(item => item.status === 'encerrada');
        }

        setConsultas(dados);
      } catch (error) {
        console.error('Erro ao buscar consultas:', error);
      } finally {
        setLoading(false);
      }
    };

    buscarConsultas();
  }, [filtro]);

  if (loading) {
    return (
      <View style={styles.historicocontainer}>
        <Text>Carregando consultas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.historicocontainer}>
      {consultas.length > 0 ? (
        consultas.map((consulta, index) => (
          <Botaoconsultas
            key={index}
            nome={consulta.nome}
            cargo={consulta.cargo}
            tempo={consulta.tempo}
            horario={consulta.horario}
            valor={consulta.valor}
            imagemdeendamento={consulta.imagemdeendamento}
            corbarra={
              consulta.status === 'realizada' ? '#7ed957' :
              consulta.status === 'cancelada' ? '#ff0000' :
              consulta.status === 'andamento' ? '#ffde59' :
              '#cccccc' // em casso de null ou undefined no status
            }
          />
        ))
      ) : (
        <Text>Nenhuma consulta encontrada.</Text>
      )}
    </View>
  );
}
