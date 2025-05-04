import { View,Text } from "react-native";
import { styles } from "./styles";
import { useNavigation } from '@react-navigation/native';
export default function Pulseira() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>pulseira</Text>
        </View>
    );
}