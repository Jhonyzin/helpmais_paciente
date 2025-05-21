import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { styles } from "./styles";
import { View, Image, StatusBar, TouchableOpacity, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import icons from '../constants/icons';
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
  const [tipoUsuario, setTipoUsuario] = useState('paciente');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const navigateToinicio = () => navigation.navigate('Inicio');
  const navigateToinicioMedico = () => navigation.navigate('InicioMedico');

  const navigateTocadastro = () => navigation.navigate('Cadastro');

  useEffect(() => {
    NfcManager.start();
  }, []);

  const alternarPaciente = () => {
    setLogin('');
    setTipoUsuario('paciente');
  };
  const alternarMedico = () => {
    setLogin('');
    setTipoUsuario('medico');
  };

  const handleLogin = async () => {
    try {
      const payload =
        tipoUsuario === 'paciente'
          ? { cpf: login.replace(/\D/g, ''), senha }
          : { crm: login.trim(), senha };

      const endpoint = tipoUsuario === 'paciente' ? '/usuario/login' : '/medico/login';

      const response = await axios.post(`${API_URL}${endpoint}`, payload);
      const { token } = response.data;
      await AsyncStorage.setItem('userToken', token);
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

  // ... (importações e demais funções continuam iguais)

  return (
    <View style={[styles.container, { paddingHorizontal: 20 }, styles.fundo]}>
      <StatusBar barStyle="light-content" backgroundColor="#004aad" />

      <Image source={icons.iconlogo} style={styles.imagem} resizeMode="contain" />

      {/* Botões Paciente / Médico */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        <TouchableOpacity
          style={[
            styles.tipoBotao,
            tipoUsuario === 'paciente' && styles.tipoBotaoAtivo
          ]}
          onPress={alternarPaciente}
        >
          <Text
            style={[
              styles.tipoTexto,
              tipoUsuario === 'paciente' && styles.tipoTextoAtivo
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

      {/* Campo de login */}
      <View style={styles.inputContainer}>
        <Image source={icons.iconperfil} style={styles.icon} resizeMode="contain" />
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#ccc"
          onChangeText={(text) =>
            setLogin(tipoUsuario === 'paciente' ? formatarCPF(text) : text)
          }
          value={login}
          keyboardType={tipoUsuario === 'paciente' ? 'numeric' : 'default'}
          maxLength={tipoUsuario === 'paciente' ? 14 : 15}
        />
      </View>

      {/* Campo de senha */}
      <View style={styles.inputContainer}>
        <Image source={icons.iconsegu} style={styles.icon} resizeMode="contain" />
        <TextInput
          style={[styles.input, { fontFamily: 'monospace' }]}
          placeholder="Senha"
          placeholderTextColor="#ccc"
          onChangeText={setSenha}
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

      {/* Botão Entrar */}
      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Text style={styles.textocinza}>OU</Text>
      </View>

      <TouchableOpacity style={styles.botao} onPress={readNfc}>
        <Text style={styles.textoBotao}>NFC</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateTocadastro}>
        <Text style={styles.linkTexto}>Não tem conta? Fazer cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}
