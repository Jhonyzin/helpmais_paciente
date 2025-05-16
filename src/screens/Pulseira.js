import { View,Text } from "react-native";
import { styles } from "./styles";
import { useNavigation } from '@react-navigation/native';
export default function Pulseira() {
   
    return (
        <View style={[styles.container , {backgroundColor: "#1c2c41"}]}>
            <View style={[styles.container, { paddingHorizontal: 20}]}>
            <Text>pulseira</Text>
            </View>
        </View>
    );
}