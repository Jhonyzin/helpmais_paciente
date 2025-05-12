import { View,Text } from "react-native";
import { styles } from "./styles";
import { useNavigation } from '@react-navigation/native';
export default function Pulseira() {
    const navigation = useNavigation();
    return (
<<<<<<< HEAD
        <View style={styles.container}>
=======
<<<<<<< HEAD
        <View style={styles.container}>
=======
        <View style={[styles.container, paddingHorizontal = 20]}>
>>>>>>> 360772c (historicao)
>>>>>>> 9c7331c (historicaoss)
            <Text>pulseira</Text>
        </View>
    );
}