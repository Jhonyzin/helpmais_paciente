import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { styles } from "../styles";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import icons from "../../constants/icons";

export default function InformacoesConsulta() {
    const navigation = useNavigation();
    const route = useRoute();
    const consulta = route.params?.consulta;
    const [dadosConsulta, setDadosConsulta] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (consulta) {
            buscarDadosConsulta();
        }
    }, [consulta]);

    const buscarDadosConsulta = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('userToken');
            console.log('Consulta recebida:', consulta);
            console.log('ID da consulta:', consulta?.id);
            
            if (!consulta?.id) {
                console.error('ID da consulta não encontrado');
                Alert.alert('Erro', 'ID da consulta não encontrado');
                return;
            }

            const response = await axios.get(
                `https://backend-811v.onrender.com/consulta/dados/${consulta.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log('Resposta da API:', response.data);

            if (response.data.success) {
                setDadosConsulta(response.data.data);
            } else {
                console.error('Resposta sem sucesso:', response.data);
                Alert.alert('Erro', response.data.message || 'Não foi possível carregar os dados da consulta.');
            }
        } catch (error) {
            console.error('Erro detalhado ao buscar dados da consulta:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers
            });
            Alert.alert('Erro', 'Não foi possível carregar os dados da consulta. Por favor, tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={styles.texto}>Carregando informações da consulta...</Text>
            </View>
        );
    }

    if (!dadosConsulta) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={styles.texto}>Nenhuma informação disponível para esta consulta.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerConsulta}>
                <View style={styles.headerInfo}>
                    <Text style={styles.tituloSecao}>Médico</Text>
                    <View style={styles.perfilContainer}>
                        <Image 
                            source={dadosConsulta.medico?.imagem_perfil || icons.iconprinperfil} 
                            style={styles.imghisto} 
                            resizeMode="contain"
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.texto}>{dadosConsulta.medico?.nome || 'Médico'}</Text>
                            <Text style={styles.cargotext}>{dadosConsulta.medico?.especialidade || 'Especialidade não informada'}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.headerInfo}>
                    <Text style={styles.tituloSecao}>Paciente</Text>
                    <View style={styles.perfilContainer}>
                        <Image 
                            source={dadosConsulta.paciente?.imagem_perfil || icons.iconprinperfil} 
                            style={styles.imghisto} 
                            resizeMode="contain"
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.texto}>{dadosConsulta.paciente?.nome || 'Paciente'}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.conteudoConsulta}>
                {dadosConsulta.motivo && (
                    <View style={styles.secao}>
                        <Text style={styles.tituloSecao}>Motivo da Consulta</Text>
                        <Text style={styles.textoConteudo}>{dadosConsulta.motivo}</Text>
                    </View>
                )}

                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Sintomas</Text>
                    <View style={styles.sintomasContainer}>
                        {dadosConsulta.sintomas && dadosConsulta.sintomas.length > 0 ? (
                            dadosConsulta.sintomas.map((sintoma, index) => (
                                <View key={index} style={styles.sintomaTag}>
                                    <Text style={styles.textoSintoma}>{sintoma}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.textoConteudo}>Nenhum sintoma registrado</Text>
                        )}
                    </View>
                </View>

                {dadosConsulta.observacoes && (
                    <View style={styles.secao}>
                        <Text style={styles.tituloSecao}>Observações</Text>
                        <Text style={styles.textoConteudo}>{dadosConsulta.observacoes}</Text>
                    </View>
                )}

                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Exames</Text>
                    <Text style={styles.textoConteudo}>
                        {dadosConsulta.exames && dadosConsulta.exames.length > 0 
                            ? dadosConsulta.exames.join(', ') 
                            : 'Nenhum exame solicitado'}
                    </Text>
                </View>

                {dadosConsulta.diagnostico && (
                    <View style={styles.secao}>
                        <Text style={styles.tituloSecao}>Diagnóstico</Text>
                        <Text style={styles.textoConteudo}>{dadosConsulta.diagnostico}</Text>
                    </View>
                )}

                {dadosConsulta.receitas && dadosConsulta.receitas.length > 0 && (
                    <View style={styles.secao}>
                        <Text style={styles.tituloSecao}>Receitas</Text>
                        {dadosConsulta.receitas.map((receita, index) => (
                            <View key={index} style={styles.receitaContainer}>
                                <Text style={styles.medicamento}>{receita.medicamento}</Text>
                                <Text style={styles.textoConteudo}>Dosagem: {receita.dosagem}</Text>
                                <Text style={styles.textoConteudo}>Frequência: {receita.frequencia}</Text>
                                <Text style={styles.textoConteudo}>Duração: {receita.duracao}</Text>
                                {receita.observacoes && (
                                    <Text style={styles.textoConteudo}>Obs: {receita.observacoes}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}