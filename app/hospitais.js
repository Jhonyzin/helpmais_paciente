import { View,Text } from "react-native";
import { styles } from "./styles";
import { useRouter } from 'expo-router';

export default function Hospitais() {
    const router = useRouter();
    return(
    <View style = {styles.cor}>
        
        <Text style={styles.texte}>hospitais</Text>
    </View>
    );
}