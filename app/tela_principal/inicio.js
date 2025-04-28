import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, Image, Text } from 'react-native';
import icons from '../../constants/icons.js';
import { styles } from './styles.js';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = __DEV__ ? "http://localhost:3000" : "https://api.example.com";

export default function Teladeinicio() {
  const navigation = useNavigation(); 
  const [nome, setNome] = useState('');

  useEffect(() => {
    async function buscarUsuario() {
      try {
        const response = await axios.get(`${API_URL}/nome`, {
          headers: {
            Authorization: `Bearer SEU_TOKEN_AQUI`, 
          },
        });
        setNome(response.data.nome || 'Usuário');
      } catch (error) {
        console.warn('Erro ao buscar usuário:', error);
        setNome('Usuário');
      }
    }

    buscarUsuario();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#004aad" hidden={false} />

      <View style={styles.quadrado1} />

      <View>  
        <TouchableOpacity onPress={() => navigation.navigate('Config')}>
          <View style={styles.quadrado}>
            <Image source={icons.iconprinperfil} style={styles.image_ico_perfil} resizeMode="contain" />
            <Text style={styles.quatext}> Olá,</Text>
            <Text style={styles.textodonome} adjustsFontSizeToFit numberOfLines={1} minimumFontScale={0.7}>
              {nome ? nome : 'Carregando...'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <View style={styles.botaoComImagem}>
          <TouchableOpacity onPress={() => navigation.navigate('Histo')}>
            <View style={styles.opcoes}>
              <Image source={icons.iconmedicam} style={styles.img_options} resizeMode="contain" />
              <View style={styles.linha2} />
              <Text style={styles.texto}>Histórico de saúde</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Pulseira')}>
          <View style={styles.opcoes}>
            <Image source={icons.iconpulsiera} style={styles.img_options} resizeMode="contain" />
            <View style={styles.linha2} />
            <Text style={styles.texto}>Minha Pulseira</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity onPress={() => navigation.navigate('Medicamentos')}>
          <View style={styles.opcoes}>
            <Image source={icons.iconmed} style={styles.img_options} resizeMode="contain" />
            <View style={styles.linha2} />
            <Text style={styles.texto}>Meus Medicamentos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Hospit')}>
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
