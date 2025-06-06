import { Text, View, TouchableOpacity, Image } from "react-native";
import { styles } from "../screens/styles";
import icons from "../constants/icons";
import { useNavigation } from '@react-navigation/native';

export default function Botaoconsultas({nome, especialidade, tempo, horario, valor, imagem_perfil, status, corbarra, consulta}) {
    const navigation = useNavigation();

    const handlePress = () => {
        console.log('Consulta selecionada:', consulta);
        navigation.navigate('InformacoesConsulta', { consulta });
    };

    return(
        <TouchableOpacity style={styles.botaconsu} onPress={handlePress}>
            <View style={[styles.Bar, {backgroundColor: corbarra}]}/>

            <View style={styles.botaodentro}>
                <View style={[styles.dentrodobota, {gap: 10}]}>
                    <Image source={imagem_perfil || icons.iconprinperfil} resizeMode="contain" style={styles.imgconsul}/>

                    <View style={{ flexDirection: 'column' }}>
                        {status && (
                            <View style={[styles.status, { backgroundColor: cor(status), alignSelf: 'flex-end', marginBottom: 4 }]}>
                                <Text style={styles.texto} adjustsFontSizeToFit numberOfLines={1}>{texto(status)}</Text>
                            </View>
                        )}
                        <Text style={styles.textoconsul}>{nome || 'Carregando...'}</Text>
                        <Text style={styles.especialidadetext}>{especialidade || 'Carregando...'}</Text>
                    </View>
                </View>

                <View style={styles.dentrodobota}>
                    <Image source={icons.iconrelohisto} style={styles.tempo2}/>
                    <Text style={[styles.texto, styles.textos]}>{horario || 'Carregando...'}</Text>
                    <Text style={[styles.texto, styles.textosDistantes]}>{tempo || 'Carregando...'}</Text>
                    <Text style={[styles.texto, styles.textosDistantes]}>{valor}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function cor(status){
    switch(status.toLowerCase()){
        case 'concluida': return '#7ed957';
        case 'agendada': return '#ffde59';
        case 'cancelada': return '#ff0000';
        default: return '#a6a6a6';
    }
}

function texto(status){
    switch(status.toLowerCase()){
        case 'concluida': return 'Concluída';
        case 'agendada': return 'Agendada';
        case 'cancelada': return 'Cancelada';
        default: return 'Sem dados'
    }
}