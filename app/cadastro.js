import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar, ScrollView } from 'react-native';
import { styles } from './styles'; 
import axios from 'axios';
import icons from '../constants/icons';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';



const API_URL = 'https://backend-811v.onrender.com'
export default function TelaCadastro() {

   const router = useRouter();

   const navigateToLogin = () => {
    router.push('/login'); 
  };

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
 

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/cadastro`, {
        nome,
        cpf,
        senha,
        email,
        telefone,
        dataNascimento,
      
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      {navigateToLogin}
    } catch (error) {
      console.warn('Erro no cadastro:', error);
      Alert.alert('Erro', error.response?.data || 'Falha no cadastro');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#004aad" />
      <View style={styles.container}>
        <Image
          source={icons.iconlogo}
          style={styles.imagem}
          resizeMode="contain"
        />
        <Text style={styles.titulo}>Cadastro</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor="#ccc"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor="#ccc"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
          maxLength={11}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#ccc"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          placeholderTextColor="#ccc"
          value={dataNascimento}
          onChangeText={setDataNascimento}
        />

        
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#ccc"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          placeholderTextColor="#ccc"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.linkTexto}>Já tem conta? Fazer login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
