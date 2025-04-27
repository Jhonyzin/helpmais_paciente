import axios from 'axios';
import React, { useState,useEffect  } from 'react';
import { View, Image, StyleSheet, StatusBar, TextInput, TouchableOpacity, Text } from 'react-native';
import icons from '../../constants/icons';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
const API_URL = __DEV__ ? "http://localhost:3000"  : "https://api.example.com"; 



export default function TeladeLogin() {
  const [cpf, setcpf] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);


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
      Alert.alert('Login realizado', `Token: ${token}`);
      navigation.navigate('Home');
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
    onChangeText={setcpf}
    value={cpf}
    keyboardType="numeric"
    maxLength={11}
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
    </View>
  );
}

const styles = StyleSheet.create({

  iconEye: {
    width: 24,
    height: 24,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: '#666'
  },
  container: {
    flex: 1,
    backgroundColor: '#004aad',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imagem: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
  },
  botao: {
    width: '100%',
    height: 50,
    backgroundColor: '#002b80',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
