import { Text, View, TouchableOpacity, Image } from "react-native";
import { styles } from "../screens/styles";
import icons from "../constants/icons";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Botaoconsultas({nome, especialidade, tempo, horario, valor, imagem_perfil, status, corbarra, id, data_hora}) {
    const navigation = useNavigation();
    const [isMedico, setIsMedico] = useState(false);

    useEffect(() => {
        async function verificarTipoUsuario() {
            try {
                const userType = await AsyncStorage.getItem('userType');
                console.log('[Botaoconsultas] userType encontrado no AsyncStorage:', userType);
                setIsMedico(userType === 'medico');
            } catch (error) {
                console.error('Erro ao verificar tipo de usuário:', error);
            }
        }
        verificarTipoUsuario();
    }, []);

    const handlePress = () => {
        console.log('[Botaoconsultas] Iniciando navegação');
        console.log('[Botaoconsultas] isMedico:', isMedico);
        console.log('[Botaoconsultas] Dados da consulta:', {
            id,
            nome,
            especialidade,
            imagem_perfil,
            status,
            data_hora,
            valor
        });

        const consulta = {
            id,
            nome,
            especialidade,
            imagem_perfil,
            status,
            data_hora,
            valor
        };

        try {
            const telaDestino = isMedico ? 'InformacoesMedico' : 'InformacoesConsulta';
            console.log('[Botaoconsultas] Navegando para:', telaDestino);
            navigation.navigate(telaDestino, { consulta });
            console.log('[Botaoconsultas] Navegação realizada com sucesso para:', telaDestino);
        } catch (error) {
            console.error('[Botaoconsultas] Erro ao navegar:', error);
        }
    };

    const formatarValor = (valor) => {
        if (!valor) return 'R$ 0,00';
        try {
            return `R$ ${parseFloat(valor).toFixed(2).replace('.', ',')}`;
        } catch (error) {
            console.error('[Botaoconsultas] Erro ao formatar valor:', error);
            return 'R$ 0,00';
        }
    };

    const formatarHorario = (data_hora) => {
        if (!data_hora) return 'Horário não definido';
        try {
            const data = new Date(data_hora);
            const dataFormatada = format(data, "dd/MM/yyyy", { locale: ptBR });
            return dataFormatada;
        } catch (error) {
            console.error('[Botaoconsultas] Erro ao formatar horário:', error);
            return 'Horário inválido';
        }
    };

    const dataConsulta = new Date(data_hora);
    const dataHoraFormatada = format(dataConsulta, "dd/MM/yyyy HH:mm", { locale: ptBR });

    return(
        <TouchableOpacity style={[styles.botaconsu, { backgroundColor: '#2a3d57' }]} onPress={handlePress}>
            <View style={[styles.Bar, {backgroundColor: corbarra || cor(status)}]}/>

            <View style={[styles.dentrodobota, {gap: 10, flex: 1}]}>
                <Image 
                    source={imagem_perfil || icons.iconprinperfil} 
                    resizeMode="contain" 
                    style={styles.imgconsul}
                />

                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={styles.textoconsul} numberOfLines={1}>
                        {nome || 'Carregando...'}
                    </Text>
                    
                    {!isMedico && especialidade && (
                        <Text style={[styles.texto, { fontSize: 12, color: '#666' }]} numberOfLines={1}>
                            {especialidade}
                        </Text>
                    )}
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={icons.relogio} style={styles.iconeRelogio} />
                        <Text style={styles.horario}>{dataHoraFormatada}</Text>
                    </View>
                </View>

                <View style={{ justifyContent: 'space-between', height: '100%', paddingVertical: 10 }}>
                    {status && (
                        <View style={[styles.status, { backgroundColor: cor(status) }]}>
                            <Text style={styles.texto} adjustsFontSizeToFit numberOfLines={1}>
                                {texto(status)}
                            </Text>
                        </View>
                    )}
                    
                    <Text style={[styles.texto, { alignSelf: 'flex-end' }]}>
                        {formatarValor(valor)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function cor(status) {
    if (!status) return '#a6a6a6';
    
    switch(status.toLowerCase()) {
        case 'concluida': return '#7ed957';
        case 'agendada': return '#ffde59';
        case 'cancelada': return '#ff0000';
        default: return '#a6a6a6';
    }
}

function texto(status) {
    if (!status) return 'Sem status';
    
    switch(status.toLowerCase()) {
        case 'concluida': return 'Concluída';
        case 'agendada': return 'Agendada';
        case 'cancelada': return 'Cancelada';
        default: return 'Sem dados';
    }
}