import { View ,Text, Button} from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Botaoconsultas from "../constants/consultas";
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://backend-811v.onrender.com'
const { Navigator, Screen } = createMaterialTopTabNavigator()


export default function( filtro ){
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarConsultas = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get( {/*COLOCAR A URL AQUI*/}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        let dados = response.data;

        if (filtro === 'andamento') { {/*MEXER AQUI*/}
          dados = dados.filter(item => item.status === 'andamento'); {/*MEXER AQUI*/}
        } else if (filtro === 'encerrada') { {/*MEXER AQUI*/}
          dados = dados.filter(item => item.status === 'encerrada'); {/*MEXER AQUI*/}
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
            corbarra={consulta.corbarra} {/*MEXER AQUI APENAS AS CORES QUE PODEM: VERDE(#7ed957), VERMELHA(#ff0000) E AMARELA(#ffde59)*/}
          />
        ))
      ) : (
        <Text>Nenhuma consulta encontrada.</Text>
      )}
    </View>
  );
}