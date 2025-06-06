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

  const navigateToconfig = () => {
    navigation.navigate('Config'); 
  };
  const navigateToHistorico = () => {
    navigation.navigate('HistoricoMedico'); 
  };
  const navigateToPulseira = () => {
    navigation.navigate('Pulseira'); 
  }
  const navigateToMed = () => {
    navigation.navigate('Medicamentos'); 
  }
  const navigateToHospit = () => {
    navigation.navigate('Hospitais'); 
  }
  
  useEffect(() => {

    async function buscarUsuario() {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) {
          console.warn('Token não encontrado');
          return;
        }
        setToken(userToken);
        const response = await axios.get(`${API_URL}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setNome(response.data.nome || 'Usuário');
        setimagemperfil(response.data.imagem_perfil || null);
      } catch (error) {
        console.warn('Erro ao buscar usuário:', error);
        setNome('Usuário');
      }
    }

    buscarUsuario();
  }, []);

  return (
    <View style={[styles.container, {paddingHorizontal: 20, backgroundColor: "#1c2c41"}]}>
      <StatusBar barStyle="dark-content" backgroundColor="#1c2c41" hidden={false} />
      
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
    style={[styles.textodonome, { fontSize: 14 }]} 
    adjustsFontSizeToFit
    numberOfLines={1}
    minimumFontScale={0.7}
  >
    {especialidade ? especialidade : 'Carregando...'}
  </Text>
</View>
  </View>
</TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <View style={styles.botaoComImagem}>
          <TouchableOpacity onPress={navigateToHistorico}>
            <View style={styles.opcoes}>
              <Image source={icons.iconmedicam} style={styles.img_options} resizeMode="contain" />
              <View style={styles.linha2} />
              <Text style={styles.texto}>Histórico de saúde</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={navigateToPulseira}>
          <View style={styles.opcoes}>
            <Image source={icons.iconpulsiera} style={styles.img_options}/>
            <View style={styles.linha2} />
            <Text style={styles.texto}>Minha Pulseira</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity onPress={navigateToMed}>
          
          <View style={styles.opcoes}>
            <Image source={icons.iconmed} style={styles.img_options}/>
            <View style={styles.linha2} />
            <Text style={styles.texto}>Meus Medicamentos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToHospit}>
          <View style={styles.opcoes}>
            <Image source={icons.iconhospital} style={styles.img_options} resizeMode="contain" />
            <View style={styles.linha2} />
            <Text style={styles.texto}>Hospitais Perto</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}