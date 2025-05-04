import axios from 'axios';
import React, { useState,useEffect  } from 'react';
import { styles } from "./styles";
import { View, Image, StatusBar, TextInput, TouchableOpacity, Text } from 'react-native';
import icons from '../constants/icons';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const formatarCPF = (texto) => {
  const numeros = texto.replace(/\D/g, '');

  if (numeros.length <= 3) return numeros;
  if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
  if (numeros.length <= 9) return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
  return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9, 11)}`;
};

const API_URL = 'https://backend-811v.onrender.com'



export default function Login() {
  const navigation = useNavigation();

  const [cpf, setcpf] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  
  const navigateToinicio = () => {
    navigation.navigate('Inicio'); 
  };
  const navigateTocadastro = () => {
    router.push('Cadastro'); 
  };


  useEffect(() => {
    NfcManager.start();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        cpf,
        password: senha,
      });
      const { token } = response.data;
      await AsyncStorage.setItem('userToken', token);
      Alert.alert('Login realizado', `Token: ${token}`);
      navigateToinicio(); 
    } catch (error) {
      console.warn('Erro ao logar:', error);
      Alert.alert('Erro no login', error.response?.data || 'Falha na requisição');
    }
  };
  const readNfc = async () => {
    try {
     
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.log('Tag NFC lida:', tag);
      Alert.alert('NFC Detectado', JSON.stringify(tag));
    } catch (ex) {
      console.warn('Erro ao ler NFC', ex);
    } finally {
     
      NfcManager.cancelTechnologyRequest();
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#004aad" />

      <Image
        source={icons.iconlogo}
        style={styles.imagem}
        resizeMode="contain"
      />

<View style={styles.inputContainer}>
  <Image
    source={icons.iconperfil} 
    style={styles.icon}
    resizeMode="contain"
  />
  <TextInput
    style={styles.input}
    placeholder="CPF"
    placeholderTextColor="#ccc"
    onChangeText={(text) => setcpf(formatarCPF(text))}
    value={cpf}
    keyboardType="numeric"
    maxLength={14}
  />
</View>

<View style={styles.inputContainer}>
  <Image
    source={icons.iconsegu}
    style={styles.icon}
    resizeMode="contain"
  />
  
  <TextInput
    style={styles.input}
    placeholder="Senha"
    placeholderTextColor="#ccc"
    onChangeText={setSenha}
    value={senha}
    secureTextEntry={!senhaVisivel} 
  />
  
  <TouchableOpacity  onPress={() => setSenhaVisivel(!senhaVisivel)}>
    <Image
      source={senhaVisivel ? icons.iconver : icons.iconocul} 
      style={styles.iconEye}
      resizeMode="contain"
    />
  </TouchableOpacity>
</View>


      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.botao} onPress={readNfc}>
        <Text style={styles.textoBotao}>NFC</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateTocadastro}>
                <Text style={styles.linkTexto}>não tem conta? Fazer cadastro</Text>
              </TouchableOpacity>
    </View>
    
  );
}
