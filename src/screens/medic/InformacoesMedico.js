import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Alert, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import icons from '../../constants/icons.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles.js';
import { useRoute, useNavigation } from '@react-navigation/native';
import SintomasPicker from '../../components/SintomasPicker';

export default function InformacoesMedico() {
  const navigation = useNavigation();
  const route = useRoute();
  const consulta = route.params?.consulta;
  const [nome, setNome] = useState('');
  const [imagem_perfil, setImagemPerfil] = useState(null);
  const [sintomas, setSintomas] = useState([]);
  const [motivo, setMotivo] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [exames, setExames] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [loading, setLoading] = useState(false);
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    console.log('Consulta recebida:', consulta);
    if (consulta) {
      setNome(consulta.nome || '');
      setImagemPerfil(consulta.imagem_perfil || null);
      buscarDadosConsulta();
    }
  }, [consulta]);

  const buscarDadosConsulta = async () => {
    try {
      console.log('Iniciando busca dos dados da consulta:', consulta.id);
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token obtido:', token ? 'Sim' : 'Não');

      const response = await axios.get(
        `https://backend-811v.onrender.com/consulta/dados/${consulta.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Resposta da API:', response.data);

      if (response.data.success) {
        const dados = response.data.data;
        console.log('Dados recebidos:', dados);
        
        setMotivo(dados.motivo || '');
        setObservacoes(dados.observacoes || '');
        setExames(dados.exames || '');
        setDiagnostico(dados.diagnostico || '');
        
        // Se houver sintomas, atualiza o estado
        if (dados.sintomas && Array.isArray(dados.sintomas)) {
          console.log('Sintomas recebidos:', dados.sintomas);
          setSintomas(dados.sintomas);
        }

        // Se houver receitas, atualiza o estado
        if (dados.receitas && Array.isArray(dados.receitas)) {
          console.log('Receitas recebidas:', dados.receitas);
          setReceitas(dados.receitas);
        }
      } else {
        console.error('Resposta sem sucesso:', response.data);
      }
    } catch (error) {
      console.error('Erro detalhado ao buscar dados da consulta:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      Alert.alert('Erro', 'Não foi possível carregar os dados da consulta.');
    }
  };

  const adicionarReceita = () => {
    setReceitas([...receitas, {
      medicamento: '',
      dosagem: '',
      frequencia: '',
      duracao: '',
      observacoes: ''
    }]);
  };

  const atualizarReceita = (index, campo, valor) => {
    const novasReceitas = [...receitas];
    novasReceitas[index] = { ...novasReceitas[index], [campo]: valor };
    setReceitas(novasReceitas);
  };

  const removerReceita = (index) => {
    const novasReceitas = receitas.filter((_, i) => i !== index);
    setReceitas(novasReceitas);
  };

  const salvarConsulta = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');

      // Extrai apenas os IDs dos sintomas para enviar ao backend
      const sintomasIds = sintomas.map(s => s.id);

      await axios.post(
        'https://backend-811v.onrender.com/consulta/resultado',
        {
          id_consulta: consulta.id,
          motivo,
          observacoes,
          exames: exames.split(',').map(e => e.trim()).filter(e => e),
          diagnostico,
          sintomas: sintomasIds,
          receitas
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Sucesso', 'Consulta salva com sucesso!');
      navigation.goBack();
    } catch (err) {
      console.error('Erro ao salvar consulta:', err);
      Alert.alert('Erro', 'Erro ao salvar consulta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={{ padding: 20 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        {imagem_perfil && (
          <Image
            source={imagem_perfil}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        )}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 8 }}>{nome}</Text>
      </View>

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 16 }}>Motivo da Consulta</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 16, borderRadius: 4, color: '#333' }}
        value={motivo}
        onChangeText={setMotivo}
        placeholder="Digite o motivo da consulta"
        placeholderTextColor="#999"
        multiline
      />

      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sintomas</Text>
      <View style={{ marginBottom: 16 }}>
        <SintomasPicker 
          onSubmit={setSintomas} 
          initialSintomas={sintomas}
        />
      </View>

      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Observações</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 16, borderRadius: 4, color: '#333' }}
        value={observacoes}
        onChangeText={setObservacoes}
        placeholder="Digite as observações"
        placeholderTextColor="#999"
        multiline
      />

      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Exames</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 16, borderRadius: 4, color: '#333' }}
        value={exames}
        onChangeText={setExames}
        placeholder="Digite os exames solicitados"
        placeholderTextColor="#999"
        multiline
      />

      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Diagnóstico</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 16, borderRadius: 4, color: '#333' }}
        value={diagnostico}
        onChangeText={setDiagnostico}
        placeholder="Digite o diagnóstico"
        placeholderTextColor="#999"
        multiline
      />

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 16 }}>Receitas</Text>
      {receitas.map((receita, index) => (
        <View key={index} style={{ marginBottom: 16, padding: 8, borderWidth: 1, borderRadius: 4 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Receita {index + 1}</Text>
            <TouchableOpacity onPress={() => removerReceita(index)}>
              <Text style={{ color: '#ff0000', fontSize: 18 }}>×</Text>
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={{ borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4, color: '#333' }}
            value={receita.medicamento}
            onChangeText={(valor) => atualizarReceita(index, 'medicamento', valor)}
            placeholder="Medicamento"
            placeholderTextColor="#999"
          />

          <TextInput
            style={{ borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4, color: '#333' }}
            value={receita.dosagem}
            onChangeText={(valor) => atualizarReceita(index, 'dosagem', valor)}
            placeholder="Dosagem"
            placeholderTextColor="#999"
          />

          <TextInput
            style={{ borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4, color: '#333' }}
            value={receita.frequencia}
            onChangeText={(valor) => atualizarReceita(index, 'frequencia', valor)}
            placeholder="Frequência"
            placeholderTextColor="#999"
          />

          <TextInput
            style={{ borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4, color: '#333' }}
            value={receita.duracao}
            onChangeText={(valor) => atualizarReceita(index, 'duracao', valor)}
            placeholder="Duração"
            placeholderTextColor="#999"
          />

          <TextInput
            style={{ borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4, color: '#333' }}
            value={receita.observacoes}
            onChangeText={(valor) => atualizarReceita(index, 'observacoes', valor)}
            placeholder="Observações"
            placeholderTextColor="#999"
            multiline
          />
        </View>
      ))}

      <TouchableOpacity 
        onPress={adicionarReceita}
        style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          marginBottom: 16,
          backgroundColor: '#004aad',
          padding: 10,
          borderRadius: 8
        }}
      >
       
        <Text style={{ color: '#fff', marginLeft: 8, fontSize: 16 }}>
          Adicionar Receita
        </Text>
      </TouchableOpacity>

      <Button
        title={loading ? 'Salvando...' : 'Salvar Consulta'}
        onPress={salvarConsulta}
        disabled={loading}
      />
    </ScrollView>
  );
}
