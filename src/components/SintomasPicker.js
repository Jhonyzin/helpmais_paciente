import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, Modal } from 'react-native';
import axios from 'axios';

const SintomasPicker = ({ onSubmit }) => {
  const [sintomas, setSintomas] = useState([]);
  const [busca, setBusca] = useState('');
  const [selecionados, setSelecionados] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [sintomasSelecionados, setSintomasSelecionados] = useState([]);

  useEffect(() => {
    axios.get('https://backend-811v.onrender.com/consulta/sintomas')
      .then(res => {
        if (Array.isArray(res.data)) {
          setSintomas(res.data);
        } else {
          console.error('Dados inválidos recebidos da API');
          setSintomas([]);
        }
      })
      .catch(err => {
        console.error('Erro ao buscar sintomas:', err);
        setSintomas([]);
      });
  }, []);

  const toggleSelecionado = (id, nome) => {
    const atualizados = selecionados.includes(id)
      ? selecionados.filter(i => i !== id)
      : [...selecionados, id];

    const sintomasAtualizados = selecionados.includes(id)
      ? sintomasSelecionados.filter(s => s.id !== id)
      : [...sintomasSelecionados, { id, nome }];

    setSelecionados(atualizados);
    setSintomasSelecionados(sintomasAtualizados);
    onSubmit(atualizados);
  };

  const removerSintoma = (id) => {
    const atualizados = selecionados.filter(i => i !== id);
    const sintomasAtualizados = sintomasSelecionados.filter(s => s.id !== id);
    setSelecionados(atualizados);
    setSintomasSelecionados(sintomasAtualizados);
    onSubmit(atualizados);
  };

  const filtrar = sintomas.filter(s =>
    s && s.sintoma && s.sintoma.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={{ marginBottom: 16 }}>
      <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        style={{ 
          borderWidth: 1, 
          padding: 8, 
          borderRadius: 4,
          minHeight: 40,
          backgroundColor: '#fff'
        }}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {sintomasSelecionados.map((sintoma) => (
            <View 
              key={sintoma.id}
              style={{
                backgroundColor: '#cce5ff',
                padding: 4,
                borderRadius: 4,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Text style={{ marginRight: 4 }}>{sintoma.nome}</Text>
              <TouchableOpacity onPress={() => removerSintoma(sintoma.id)}>
                <Text style={{ color: '#ff0000' }}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          padding: 20
        }}>
          <View style={{ 
            backgroundColor: '#fff',
            borderRadius: 8,
            padding: 16,
            maxHeight: '80%'
          }}>
            <TextInput
              placeholder="Buscar sintoma"
              value={busca}
              onChangeText={setBusca}
              style={{ 
                borderWidth: 1, 
                marginBottom: 10, 
                padding: 8,
                borderRadius: 4
              }}
            />
            <FlatList
              data={filtrar}
              keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => toggleSelecionado(item.id, item.sintoma)}
                  style={{
                    padding: 10,
                    backgroundColor: selecionados.includes(item.id) ? '#cce5ff' : '#fff',
                    borderBottomWidth: 1,
                    borderBottomColor: '#eee'
                  }}
                >
                  <Text>{item?.sintoma || 'Sintoma sem nome'}</Text>
                </TouchableOpacity>
              )}
              style={{ maxHeight: 300 }}
            />
            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={{
                backgroundColor: '#004aad',
                padding: 10,
                borderRadius: 4,
                marginTop: 10,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: '#fff' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SintomasPicker;
