import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from './styles'; 
import axios from 'axios';
import icons from '../constants/icons';
import { Image, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

import { 
  formatarTelefone, 
  formatarData, 
  formatarCep,
  dataValida,
  validarEmail
} from '../utils/validacao';

const API_URL = 'https://backend-811v.onrender.com/medico';

export default function CadastroMedico() {
  const [form, setForm] = useState({
    nome: '',
    crm: '',
    senha: '',
    confirmarSenha: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    especialidade: '',
    cep: '',
    estado: '',
    cidade: '',
    bairro: '',
    logradouro: '',
    numero: '',
    complemento: ''
  });
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [openEstado, setOpenEstado] = useState(false);
  const [itemsEstado, setItemsEstado] = useState([]);
  const [openCidade, setOpenCidade] = useState(false);
  const [itemsCidade, setItemsCidade] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);

  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Login'); 
  };

  const handleChange = (name, value) => {
    let formattedValue = value;
    
    switch(name) {
      case 'telefone':
        formattedValue = formatarTelefone(value);
        break;
      case 'dataNascimento':
        formattedValue = formatarData(value);
        break;
      case 'cep':
        formattedValue = formatarCep(value);
        if (formattedValue.replace(/\D/g, '').length === 8) {
          fetchAddressByCep(formattedValue);
        }
        break;
    }
    
    setForm(prev => ({ ...prev, [name]: formattedValue }));
  };

  const fetchAddressByCep = async (cep) => {
    try {
      setLoadingCep(true);
      const response = await axios.get(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
      
      if (!response.data.erro) {
        setForm(prev => ({
          ...prev,
          estado: response.data.uf,
          cidade: response.data.localidade,
          bairro: response.data.bairro,
          logradouro: response.data.logradouro,
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setLoadingCep(false);
    }
  };

  const validateForm = () => {
    if (!form.nome.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu nome completo');
      return false;
    }

   

    if (!validarEmail(form.email)) {
      Alert.alert('Erro', 'Email inválido');
      return false;
    }

    if (form.senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    if (form.senha !== form.confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return false;
    }

    if (!dataValida(form.dataNascimento)) {
      Alert.alert('Erro', 'Data de nascimento inválida');
      return false;
    }

    return true;
  };

  const handleCadastro = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      const partesData = form.dataNascimento.split('/');
      const dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;

      const response = await axios.post(`${API_URL}/cadastro`, {
        ...form,
        crm: form.crm.replace(/\D/g, ''),
        telefone: form.telefone.replace(/\D/g, ''), 
        dataNascimento: dataFormatada,
        cep: form.cep.replace(/\D/g, ''),
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigateToLogin();
    } catch (error) {
      console.error('Erro no cadastro:', error);
      Alert.alert('Erro', error.response?.data?.message || 'Falha no cadastro');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(response => {
        const estadosFormatados = response.data.map(uf => ({
          label: uf.nome,
          value: uf.sigla,
        }));
        setItemsEstado(estadosFormatados);
      })
      .catch(error => console.error('Erro ao buscar estados:', error));
  }, []);

  useEffect(() => {
    if (form.estado) {
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.estado}/municipios`)
        .then(response => {
          const cidadesFormatadas = response.data.map(mun => ({
            label: mun.nome,
            value: mun.nome,
          }));
          setItemsCidade(cidadesFormatadas);
        })
        .catch(error => console.error('Erro ao buscar municípios:', error));
    }
  }, [form.estado]);

  return (
    <View style={styles.fundo}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ backgroundColor: '#004aad' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <StatusBar barStyle="dark-content" backgroundColor="#004aad" />
          <View style={styles.container}>
            <Image
              source={icons.iconlogo}
              style={styles.imagem}
              resizeMode="contain"
              accessibilityLabel="Logo do aplicativo"
            />

            <TextInput style={styles.input} placeholder="Nome Completo" placeholderTextColor="#ccc" value={form.nome} onChangeText={(text) => handleChange('nome', text)} accessibilityLabel="Campo para inserir nome completo" />

            <TextInput style={styles.input} placeholder="CRM" placeholderTextColor="#ccc" value={form.crm} onChangeText={(text) => handleChange('crm', text)}  maxLength={14} accessibilityLabel="Campo para inserir CRM" />

            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#ccc" value={form.email} onChangeText={(text) => handleChange('email', text)} keyboardType="email-address" autoCapitalize="none" accessibilityLabel="Campo para inserir email" />

            <TextInput style={styles.input} placeholder="Telefone" placeholderTextColor="#ccc" value={form.telefone} onChangeText={(text) => handleChange('telefone', text)} keyboardType="phone-pad" maxLength={15} accessibilityLabel="Campo para inserir telefone" />

            <TextInput style={styles.input} placeholder="Data de Nascimento (DD/MM/AAAA)" placeholderTextColor="#ccc" value={form.dataNascimento} onChangeText={(text) => handleChange('dataNascimento', text)} keyboardType="numeric" maxLength={10} accessibilityLabel="Campo para inserir data de nascimento" />
            <TextInput style={styles.input} placeholder="Especialidade" placeholderTextColor="#ccc" value={form.especialidade} onChangeText={(text) => handleChange('especialidade', text)} accessibilityLabel="Campo para inserir especialidade" />


            <TextInput style={styles.input} placeholder="CEP" placeholderTextColor="#ccc" value={form.cep} onChangeText={(text) => handleChange('cep', text)} keyboardType="numeric" maxLength={9} accessibilityLabel="Campo para inserir CEP" />
            {loadingCep && <ActivityIndicator size="small" color="#fff" />}

            <Text style={styles.label}>Estado</Text>
            <DropDownPicker
              listMode="MODAL"
              open={openEstado}
              value={form.estado}
              items={itemsEstado}
              setOpen={setOpenEstado}
              setValue={(value) => handleChange('estado', value())}
              setItems={setItemsEstado}
              placeholder="Selecione um estado"
              searchable={true}
              searchPlaceholder="Digite o nome do estado..."
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              accessibilityLabel="Selecionar estado"
            />

            <Text style={styles.label}>Cidade</Text>
            <DropDownPicker
              listMode="MODAL"
              open={openCidade}
              value={form.cidade}
              items={itemsCidade}
              setOpen={setOpenCidade}
              setValue={(value) => handleChange('cidade', value())}
              setItems={setItemsCidade}
              placeholder="Selecione uma cidade"
              searchable={true}
              searchPlaceholder="Digite o nome da cidade..."
              disabled={!form.estado}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              accessibilityLabel="Selecionar cidade"
            />

            <TextInput style={styles.input} placeholder="Bairro" placeholderTextColor="#ccc" value={form.bairro} onChangeText={(text) => handleChange('bairro', text)} accessibilityLabel="Campo para inserir bairro" />
            <TextInput style={styles.input} placeholder="Logradouro" placeholderTextColor="#ccc" value={form.logradouro} onChangeText={(text) => handleChange('logradouro', text)} accessibilityLabel="Campo para inserir logradouro" />
            <TextInput style={styles.input} placeholder="Número" placeholderTextColor="#ccc" value={form.numero} onChangeText={(text) => handleChange('numero', text)} keyboardType="numeric" accessibilityLabel="Campo para inserir número" />
            <TextInput style={styles.input} placeholder="Complemento" placeholderTextColor="#ccc" value={form.complemento} onChangeText={(text) => handleChange('complemento', text)} accessibilityLabel="Campo para inserir complemento" />

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#ccc"
                onChangeText={(text) => handleChange('senha', text)}
                value={form.senha}
                secureTextEntry={!senhaVisivel}
                accessibilityLabel="Campo para inserir senha"
              />
              <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)} accessibilityLabel={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}>
                <Image source={senhaVisivel ? icons.iconver : icons.iconocul} style={styles.iconEye} resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirmar Senha"
                placeholderTextColor="#ccc"
                onChangeText={(text) => handleChange('confirmarSenha', text)}
                value={form.confirmarSenha}
                secureTextEntry={!senhaVisivel}
                accessibilityLabel="Campo para confirmar senha"
              />
              <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)} accessibilityLabel={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}>
                <Image source={senhaVisivel ? icons.iconver : icons.iconocul} style={styles.iconEye} resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.botao} onPress={handleCadastro} disabled={loading} accessibilityLabel="Botão para cadastrar">
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBotao}>Cadastrar</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={navigateToLogin} accessibilityLabel="Link para fazer login">
              <Text style={styles.linkTexto}>Já tem conta? Fazer login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
