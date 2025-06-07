import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { styles } from "./styles";
import { View, Image, StatusBar, TouchableOpacity, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import icons from '../constants/icons';
import Errin from '../components/errin';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const formatarCPF = (texto) => {
  const numeros = texto.replace(/\D/g, '');
  return numeros
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2')
    .slice(0, 14);
};

const API_URL = 'https://backend-811v.onrender.com';

export default function Login() {
  const navigation = useNavigation();

  const [login, setLogin] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('usuario');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erroLogin, setErroLogin] = useState('');
  const [erroCampoLogin, setErroCampoLogin] = useState(false);
  const [erroCampoSenha, setErroCampoSenha] = useState(false);


  const navigateToinicio = () => navigation.navigate('Inicio');
  const navigateToinicioMedico = () => navigation.navigate('InicioMedico');

  const navigateTocadastro = () => navigation.navigate('Cadastro');
  const navigateTocadastroMedico = () => navigation.navigate('CadastroMedico');

  useEffect(() => {
    NfcManager.start();
  }, []);

  const alternarusuario = () => {
    setLogin('');
    setTipoUsuario('usuario');
  };
  const alternarMedico = () => {
    setLogin('');
    setTipoUsuario('medico');
  };

  const handleLogin = async () => {
    const campoLoginVazio = login.trim() === '';
    const campoSenhaVazio = senha.trim() === '';

    setErroCampoLogin(campoLoginVazio);
    setErroCampoSenha(campoSenhaVazio);

    if (campoLoginVazio || campoSenhaVazio) {
      setErroLogin('Preencha todos os campos corretamente.');
      Alert.alert('Erro', 'Preencha todos os campos corretamente.');
      return;
    }

    try {
      const payload =
        tipoUsuario === 'usuario'
          ? { cpf: login.replace(/\D/g, ''), senha }
          : { crm: login.trim(), senha };

      const endpoint = tipoUsuario === 'usuario' ? '/usuario/login' : '/medico/login';

      const response = await axios.post(`${API_URL}${endpoint}`, payload);
      const { token } = response.data;
      await AsyncStorage.setItem('userToken', token);
      if (tipoUsuario === 'usuario') {
        navigateToinicio();
      } else {
        navigateToinicioMedico();
}
    } catch (error) {
      setErroCampoLogin(true); 
      setErroCampoSenha(true);

      const mensagem =
        error.response?.data?.message || 'Usuário ou senha incorretos';
      setErroLogin(mensagem);

      Alert.alert('Erro no login', mensagem);
    }
  };

 const readNfc = async () => {
  try {
    // 1. Verificar suporte NFC
    if (!await NfcManager.isSupported()) {
      Alert.alert('Erro', 'Seu dispositivo não suporta NFC');
      return;
    }

    if (!await NfcManager.isEnabled()) {
      Alert.alert('Erro', 'Ative o NFC nas configurações');
      return;
    }

    // 2. Configurar timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Tempo excedido')), 15000)
    );

    // 3. Ler tag NFC
    await NfcManager.start();
    const techRequest = NfcManager.requestTechnology(NfcTech.NfcA);
    
    const tag = await Promise.race([techRequest, timeoutPromise])
      .then(async () => {
        const tag = await NfcManager.getTag();
        await NfcManager.cancelTechnologyRequest();
        return tag;
      });

    console.log('Tag NFC:', JSON.stringify(tag, null, 2));

    // 4. Processar UID
    if (!tag?.id) throw new Error('UID não encontrado');

    let uid;
    if (Array.isArray(tag.id)) {
      uid = tag.id.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    } else if (typeof tag.id === 'string') {
      uid = tag.id.replace(/[^0-9A-F]/g, '').toUpperCase();
    } else {
      throw new Error('Formato de UID inválido');
    }

    if (!uid || uid.length < 4) throw new Error('UID muito curto');

    console.log('UID processado:', uid);

    // 5. Enviar para o backend com tratamento especial
    const response = await axios.post(`${API_URL}/usuario/loginNfc`, {
      uid: uid
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    if (!response.data?.token) throw new Error('Token não recebido');

    await AsyncStorage.setItem('userToken', response.data.token);
    navigateToinicio();

  } catch (err) {
    console.error('Erro completo:', err);
    
    let message = 'Erro na leitura';
    if (err.response) {
      // Erros do servidor (500, etc)
      message = `Erro no servidor: ${err.response.status}`;
      if (err.response.data?.message) {
        message = err.response.data.message;
      }
    } else if (err.message) {
      message = err.message;
    }

    Alert.alert('Erro', message);
  } finally {
    try {
      await NfcManager.cancelTechnologyRequest();
    } catch (e) {
      console.warn('Erro ao cancelar NFC:', e);
    }
  }
};



  return (
    <View style={[styles.container, { paddingHorizontal: 20 }, styles.fundo]}>
      <StatusBar barStyle="light-content" backgroundColor="#004aad" />

      <Image source={icons.iconlogo1} style={styles.imagem} resizeMode="contain" />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        <TouchableOpacity
          style={[
            styles.tipoBotao,
            tipoUsuario === 'usuario' && styles.tipoBotaoAtivo
          ]}
          onPress={alternarusuario}
        >
          <Text
            style={[
              styles.tipoTexto,
              tipoUsuario === 'usuario' && styles.tipoTextoAtivo
            ]}
          >
            Paciente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tipoBotao,
            tipoUsuario === 'medico' && styles.tipoBotaoAtivo
          ]}
          onPress={alternarMedico}
        >
          <Text
            style={[
              styles.tipoTexto,
              tipoUsuario === 'medico' && styles.tipoTextoAtivo
            ]}
          >
            Médico
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Image source={icons.iconperfil} style={styles.icon} resizeMode="contain" />
        <TextInput
          style={[styles.input, erroCampoLogin && {borderColor: 'red', borderWidth: 1}]}
          placeholder="Usuário"
          placeholderTextColor={erroCampoLogin ? 'red' : '#ccc'}
          onChangeText={(text) =>{
            setErroCampoLogin(false);
            setLogin(tipoUsuario === 'usuario' ? formatarCPF(text) : text);
          }}
          value={login}
          keyboardType={tipoUsuario === 'usuario' ? 'numeric' : 'default'}
          maxLength={tipoUsuario === 'usuario' ? 14 : 15}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={icons.iconsegu} style={styles.icon} resizeMode="contain" />
        <TextInput
          style={[styles.input, { fontFamily: 'monospace' }, erroCampoLogin && {borderColor: 'red', borderWidth: 1}]}
          placeholder="Senha"
          placeholderTextColor= {erroCampoSenha ? 'red' : '#ccc'}
          onChangeText={(text) => {
            setErroCampoLogin(false);
            setSenha(text)
          }}
          value={senha}
          secureTextEntry={!senhaVisivel}
        />
        <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
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

      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Text style={styles.textocinza}>OU</Text>
      </View>

      <TouchableOpacity style={styles.botao} onPress={readNfc}>
        <Text style={styles.textoBotao}>NFC</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={
        tipoUsuario === 'usuario' ? navigateTocadastro : navigateTocadastroMedico
      }>
        <Text style={styles.linkTexto}>Não tem conta? Fazer cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}
