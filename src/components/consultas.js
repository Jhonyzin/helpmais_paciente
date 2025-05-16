import { Text, View, TouchableOpacity, Image } from "react-native";
import { styles } from "../screens/styles";
import icons from "../constants/icons";

export default function Botaoconsultas({nome,especialidade, tempo, horario, valor, imagem_perfil, status, corbarra}) {
    return(
        <TouchableOpacity style = {styles.botaconsu}>
            <View style={[styles.Bar, {backgroundColor: corbarra}]}/>

            <View style={styles.botaodentro}>
                <View style={styles.dentrodobota}>
                    <Image source={imagem_perfil || icons.iconprinperfil} resizeMode="contain" style={styles.imgconsul}/>

                    <View>
                        <Text style = {styles.textoconsul}>{nome || 'Carregando...'}</Text>
                        <Text style = {styles.especialidadetext}>{especialidade || 'Carregando...'}</Text>
                    </View>
                    
                    {status && (
                        <View style={[styles.container, { backgroundColor: cor(status)}]}>
                            <Text style={styles.texto}>{texto(status)}</Text>
                        </View>
                        )}
                </View>

                <View style = {styles.dentrodobota}>
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
        case 'em andamento': return '#ffde59';
        case 'encerrada': return '#ff0000';
        default: return '#a6a6a6';
    }
}

function texto(status){
    switch(status.toLowerCase()){
        case 'concluida': return 'Concluída';
        case 'em andamento': return 'Em andamento';
        case 'encerrada': return 'Encerrada';
        case 'cancelada': return 'Cancelada';
        default: return 'Sem dados'
    }
}