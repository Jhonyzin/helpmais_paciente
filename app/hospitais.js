import { View } from "react-native";
import { styles } from "./styles";
import { useRouter } from 'expo-router';

export default function Hospitais() {
    const router = useRouter();
    return(
    <View style = {styles.cor}>
        <Text>hospitais</Text>
        
        
    </View>
    );
}