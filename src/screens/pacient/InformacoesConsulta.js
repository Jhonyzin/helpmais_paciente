import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Alert, ActivityIndicator } from "react-native";
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
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('[InformacoesConsulta] Iniciando componente');
        console.log('[InformacoesConsulta] Parâmetros recebidos:', route.params);
        console.log('[InformacoesConsulta] Consulta recebida:', consulta);
        
        if (consulta?.id) {
            buscarDadosConsulta();
        } else {
            console.error('[InformacoesConsulta] ID da consulta não encontrado nos parâmetros');
            setLoading(false);
            setError('ID da consulta não encontrado');
        }
    }, [consulta?.id]);

    const buscarDadosConsulta = async () => {
        try {
            console.log('[InformacoesConsulta] Iniciando busca dos dados da consulta');
            setLoading(true);
            setError(null);
            
            const token = await AsyncStorage.getItem('userToken');
            console.log('[InformacoesConsulta] Token obtido:', token ? 'Sim' : 'Não');
            
            if (!token) {
                throw new Error('Token não encontrado');
            }

            console.log('[InformacoesConsulta] Buscando dados da consulta ID:', consulta.id);

            const response = await axios.get(
                `https://backend-811v.onrender.com/consulta/dados/${consulta.id}`,
                { 
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: 10000 
                }
            );

            console.log('[InformacoesConsulta] Resposta da API:', response.data);

            if (response.data.success) {
                const dados = response.data.data;
                console.log('[InformacoesConsulta] Dados recebidos:', dados);

                // Garantir que todos os campos necessários existam
                dados.exames = Array.isArray(dados.exames) ? dados.exames : [];
                dados.sintomas = Array.isArray(dados.sintomas) ? dados.sintomas : [];
                dados.receitas = Array.isArray(dados.receitas) ? dados.receitas : [];
                dados.medico = dados.medico || {};
                dados.paciente = dados.paciente || {};

                console.log('[InformacoesConsulta] Dados processados:', dados);
                setDadosConsulta(dados);
            } else {
                throw new Error(response.data.message || 'Não foi possível carregar os dados da consulta.');
            }
        } catch (error) {
            console.error('[InformacoesConsulta] Erro ao buscar dados da consulta:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers
            });
            
            let mensagemErro = 'Não foi possível carregar os dados da consulta.';
            
            if (error.code === 'ECONNABORTED') {
                mensagemErro = 'O servidor demorou muito para responder. Por favor, tente novamente.';
            } else if (error.response?.status === 401) {
                mensagemErro = 'Sua sessão expirou. Por favor, faça login novamente.';
            } else if (error.response?.status === 404) {
                mensagemErro = 'Consulta não encontrada.';
            }
            
            setError(mensagemErro);
            Alert.alert('Erro', mensagemErro);
        } finally {
            console.log('[InformacoesConsulta] Finalizando busca dos dados');
            setLoading(false);
        }
    };

    const formatarDataHora = (dataHora) => {
        if (!dataHora) return 'Data não definida';
        try {
            const data = new Date(dataHora);
            return data.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        } catch (error) {
            console.error('Erro ao formatar data:', error);
            return 'Data inválida';
        }
    };

    const formatarValor = (valor) => {
        if (!valor) return 'R$ 0,00';
        try {
            return `R$ ${parseFloat(valor).toFixed(2).replace('.', ',')}`;
        } catch (error) {
            console.error('Erro ao formatar valor:', error);
            return 'R$ 0,00';
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={[styles.texto, { marginTop: 10 }]}>Carregando informações da consulta...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={[styles.texto, { color: 'red', textAlign: 'center', marginHorizontal: 20 }]}>
                    {error}
                </Text>
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
        <ScrollView 
            style={styles.container}
            contentContainerStyle={{ padding: 16 }}
        >
            <View style={styles.headerConsulta}>
                <View style={styles.headerInfo}>
                    <Text style={styles.tituloSecao}>Médico</Text>
                    <View style={styles.perfilContainer}>
                        <Image 
                            source={dadosConsulta.medico?.imagem_perfil ? { uri: dadosConsulta.medico.imagem_perfil } : icons.iconprinperfil} 
                            style={styles.imghisto} 
                            resizeMode="contain"
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.texto} numberOfLines={1}>
                                {dadosConsulta.medico?.nome || 'Médico não informado'}
                            </Text>
                            <Text style={styles.cargotext} numberOfLines={1}>
                                {dadosConsulta.medico?.especialidade || 'Especialidade não informada'}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.headerInfo}>
                    <Text style={styles.tituloSecao}>Paciente</Text>
                    <View style={styles.perfilContainer}>
                        <Image 
                            source={dadosConsulta.paciente?.imagem_perfil ? { uri: dadosConsulta.paciente.imagem_perfil } : icons.iconprinperfil} 
                            style={styles.imghisto} 
                            resizeMode="contain"
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.texto} numberOfLines={1}>
                                {dadosConsulta.paciente?.nome || 'Paciente não informado'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.secao}>
                <Text style={styles.tituloSecao}>Informações da Consulta</Text>
                <Text style={styles.textoConteudo}>Data e Hora: {formatarDataHora(dadosConsulta.data_hora)}</Text>
                <Text style={styles.textoConteudo}>Status: {dadosConsulta.status || 'Não definido'}</Text>
                <Text style={styles.textoConteudo}>Valor: {formatarValor(dadosConsulta.valor)}</Text>
            </View>

            {dadosConsulta.motivo && (
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Motivo da Consulta</Text>
                    <Text style={styles.textoConteudo}>{dadosConsulta.motivo}</Text>
                </View>
            )}

            {dadosConsulta.sintomas && dadosConsulta.sintomas.length > 0 && (
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Sintomas</Text>
                    {dadosConsulta.sintomas.map((sintoma, index) => (
                        <Text key={index} style={styles.textoConteudo}>• {sintoma}</Text>
                    ))}
                </View>
            )}

            {dadosConsulta.exames && dadosConsulta.exames.length > 0 && (
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Exames</Text>
                    {dadosConsulta.exames.map((exame, index) => (
                        <Text key={index} style={styles.textoConteudo}>• {exame}</Text>
                    ))}
                </View>
            )}

            {dadosConsulta.diagnostico && (
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Diagnóstico</Text>
                    <Text style={styles.textoConteudo}>{dadosConsulta.diagnostico}</Text>
                </View>
            )}

            {dadosConsulta.observacoes && (
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Observações</Text>
                    <Text style={styles.textoConteudo}>{dadosConsulta.observacoes}</Text>
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
        </ScrollView>
    );
}