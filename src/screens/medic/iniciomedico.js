import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, Image, Text } from 'react-native';
import icons from '../../constants/icons.js';
import { styles } from '../styles.js';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = 'https://backend-811v.onrender.com/medico';

export default function Inicio() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [imagem_perfil, setimagemperfil] = useState('null');


  const [token, setToken] = useState(''); 

  const navigateToconfig = () => {
    navigation.navigate('Config'); 
  };
  const navigateToHistorico = () => {
    navigation.navigate('Historico'); 
  };

  
  useEffect(() => {
    async function buscarUsuario() {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) {
          console.warn('Token não encontrado');
          return;
        }
        setToken(userToken);
        
        console.log('Fazendo requisição para:', `${API_URL}`);
        const response = await axios.get(`${API_URL}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        console.log('Resposta da API:', response.data);

        if (response.data) {
          setNome(response.data.nome || '');
          setEspecialidade(response.data.especialidade || '');
          setimagemperfil(response.data.imagem_perfil || null);
        } else {
          console.warn('Dados do usuário não encontrados na resposta');
          setNome('');
          setEspecialidade('');
        }
      } catch (error) {
        console.error('Erro detalhado ao buscar usuário:', error.response || error);
        setNome('');
        setEspecialidade('');
      }
    }

    buscarUsuario();
  }, []);

  return (
  <View style={[styles.container, {paddingHorizontal: 20, backgroundColor: "#1c2c41"}]}>
    <StatusBar barStyle="light-content" backgroundColor="#1c2c41" hidden={false} />
        
    <View>  
      <TouchableOpacity onPress={navigateToconfig}>
        <View style={[styles.quadrado, { flexDirection: 'row', alignItems: 'center' }]}>
            {imagem_perfil ? (
              <Image
                source={{ uri: imagem_perfil }}
                style={styles.image_ico_perfil}
                resizeMode="cover"
              />
                ) : (
              <Image
                source={icons.iconprinperfil}
                style={styles.image_ico_perfil}
                resizeMode="contain"
              />
            )}
          <View style={{ marginLeft: -40 }}>
            <Text
              style={styles.textodonome}
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.7}
            >
              {nome ? nome : 'Carregando...'}
            </Text>
            <Text
              style={[styles.textodonome, { fontSize: 14, color: '#888' }]}
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.7}
            >
              {especialidade ? especialidade : ''}
            </Text>
          </View>
          <Image source={icons.iconlogodeitada} style={styles.icondeitada}/>
        </View>
      </TouchableOpacity>
    </View>

    <View style={styles.linha}>
      <View style={styles.botaoComImagem}>
        <TouchableOpacity onPress={navigateToHistorico}>
          <View style={styles.opcoes}>
            <Image source={icons.iconmedicam} style={styles.img_options} resizeMode="contain" />
            <View style={styles.linha2} />
            <Text style={styles.texto} adjustsFontSizeToFit numberOfLines={1}>Consultas</Text>
          </View>
        </TouchableOpacity>
      </View>

      
   
    </View>
  </View>
  );
}