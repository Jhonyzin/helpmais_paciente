import { Text, View, TouchableOpacity, Image } from "react-native";
import { styles } from "../screens/styles";
import icons from "./icons";

export default function Botaoconsultas({nome, cargo, tempo, horario, valor, imagemmedico, imagemdeendamento, corbarra}) {
    return(
        <TouchableOpacity style = {styles.botaconsu}>
            <View style={[styles.Bar, {backgroundColor: corbarra}]}/>

            <View style={styles.botaodentro}>
                <View style={styles.dentrodobota}>
                    <Image source={imagemmedico || icons.iconprinperfil} resizeMode="contain" style={styles.imgconsul}/>

                    <View>
                        <Text style = {styles.textoconsul}>{nome || 'Carregando...'}</Text>
                        <Text style = {styles.cargotext}>{cargo || 'Carregando...'}</Text>
                    </View>
                    
                    {imagemdeendamento && (
                        <Image source={icons.icontemp} resizeMode="contain" style={styles.tempo} />
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
