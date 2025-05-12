import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar, ScrollView } from 'react-native';
import { styles } from './styles'; 
import axios from 'axios';
import icons from '../constants/icons';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9c7331c (historicaoss)
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); // remove pontos e traços

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let primeiroDigito = 11 - (soma % 11);
  if (primeiroDigito >= 10) primeiroDigito = 0;
  if (primeiroDigito !== parseInt(cpf.charAt(9))) {
    return false;
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }

  let segundoDigito = 11 - (soma % 11);
  if (segundoDigito >= 10) segundoDigito = 0;
  if (segundoDigito !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}
<<<<<<< HEAD
=======
=======

>>>>>>> 360772c (historicao)
>>>>>>> 9c7331c (historicaoss)
const formatarCPF = (texto) => {
  const numeros = texto.replace(/\D/g, '');

  if (numeros.length <= 3) return numeros;
  if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
  if (numeros.length <= 9) return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
  return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9, 11)}`;
};

const formatarTelefone = (texto) => {
  const numeros = texto.replace(/\D/g, '');

  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
};

const formatarData = (texto) => {
  const numeros = texto.replace(/\D/g, '');

  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`;
};

function dataValida(dataStr) {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dataStr.match(regex);

  if (!match) return false;

  const dia = parseInt(match[1], 10);
  const mes = parseInt(match[2], 10) - 1; 
  const ano = parseInt(match[3], 10);

  const data = new Date(ano, mes, dia);

  return (
    data.getFullYear() === ano &&
    data.getMonth() === mes &&
    data.getDate() === dia
  );
}

const API_URL = 'https://backend-811v.onrender.com';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

    const navigation = useNavigation();

 const navigateToLogin = () => {
    navigation.navigate('Inicio'); 
  };

  const handleCadastro = async () => {
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (!regexData.test(dataNascimento)) {
      Alert.alert('Erro', 'Data de nascimento inválida. Use o formato DD/MM/AAAA.');
      return;
    }

    if (!regexCpf.test(cpf)) {
      Alert.alert('Erro', 'CPF inválido. Use o formato XXX.XXX.XXX-XX.');
      return;
    }
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9c7331c (historicaoss)
    
    if (!validarCPF(cpf)) {
      Alert.alert('Erro', 'CPF inválido. Dígitos verificadores incorretos.');
      return;
    }
    
<<<<<<< HEAD
=======
=======
>>>>>>> 360772c (historicao)
>>>>>>> 9c7331c (historicaoss)

    if (!dataValida(dataNascimento)) {
      Alert.alert('Erro', 'Data de nascimento inválida.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      // Formatar a data para o padrão YYYY-MM-DD antes de enviar
      const partesData = dataNascimento.split('/');
      const dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;

      const response = await axios.post(`${API_URL}/cadastro`, {
        nome,
        cpf,
        senha,
        email,
        telefone: telefone.replace(/\D/g, ''), // Enviar apenas números
        dataNascimento: dataFormatada,
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigateToLogin();
    } catch (error) {
      console.warn('Erro no cadastro:', error);
      Alert.alert('Erro', error.response?.data?.message || 'Falha no cadastro');
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
          onChangeText={(text) => setCpf(formatarCPF(text))}
          keyboardType="numeric"
          maxLength={14}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#ccc"
          value={telefone}
          onChangeText={(text) => setTelefone(formatarTelefone(text))}
          keyboardType="phone-pad"
          maxLength={15}
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          placeholderTextColor="#ccc"
          value={dataNascimento}
          onChangeText={(text) => setDataNascimento(formatarData(text))}
          keyboardType="numeric"
          maxLength={10}
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
