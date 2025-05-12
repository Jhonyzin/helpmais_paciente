import { View,Text} from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Config() {
     return (
        <View style={styles.container}>

            <View style={[styles.container, { paddingHorizontal: 20 }]}>

            <Text>pulseira</Text>
            </View>
        </View>
    );
}