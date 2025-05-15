import { View,Text, Image } from "react-native";
import { styles } from "./styles";
import { useNavigation } from '@react-navigation/native';
import icons from "../constants/icons";

export default function Informacoes() {
    const navigation = useNavigation();

    return(
    <View style = {styles.container}>
        <View style={{flex: 0.96, backgroundColor: '#004aad', width: '90%', borderRadius: 20, marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
            <View style = {{flex: 1, flexDirection:'row'}}>
                <Image source={icons.iconprinperfil} style={styles.imghisto} resizeMode="contain"/>
                <View>
                    <Text style={styles.texto}>DOUTORA FLAMINGO</Text>
                    <Text style={styles.cargotext}>NUMERO DA CONSULTA</Text>
                </View>
            </View>
        </View>
    </View>
    );
}