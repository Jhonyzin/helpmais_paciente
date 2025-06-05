import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, Text, Alert, Button, Image } from 'react-native';
import axios from 'axios';
import icons from '../../constants/icons.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles.js';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function InformacoesMedico() {
  const navigation = useNavigation();
  const route = useRoute();
  const { consulta } = route.params;
  const [nome, setNome] = useState('');
  const [imagem_perfil, setImagemPerfil] = useState(null);
  const [medicamento, setMedicamento] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [duracao, setDuracao] = useState('');
  const [motivo, setMotivo] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [sintoma, setSintoma] = useState('');
  const [sintomas, setSintomas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (consulta) {
      setNome(consulta.nome || '');
      setImagemPerfil(consulta.imagem_perfil || null);
    }
  }, [consulta]);

  const salvarConsulta = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');

      await axios.post(
        'https://backend-811v.onrender.com/consulta/resultado',
        {
          id_consulta: consulta.id,
          resultado: JSON.stringify({
            sintomas,
            diagnostico,
            medicamento,
            dosagem,
            frequencia,
            duracao,
            motivo,
            observacoes
          })
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Sucesso', 'Consulta salva com sucesso!');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Erro ao salvar consulta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        {imagem_perfil && (
          <Image
            source={imagem_perfil}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        )}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 8 }}>{nome}</Text>
      </View>
      <Image
                      source={icons.adicionar}
                      style={styles.image_ico_perfil}
                      resizeMode="contain"
                    />

      <Button title="Salvar Consulta" onPress={salvarConsulta} disabled={loading} />
    </ScrollView>
  );
}
