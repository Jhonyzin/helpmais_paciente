import { View, StatusBar, Text } from "react-native";
import { styles } from "../meus_medicamentos/styles.js";


export default function Medicamentos (){

    return (
    <View style = {styles.ds}>
        <StatusBar barStyle={'dark-content'} backgroundColor = "#004aad" hidden TouchableOpacity={0.1}/>
        <View style={styles.quadrado1}>
            <Text style = {styles.title}>MEUS MEDICAMENTOS</Text>
        </View>
    </View>

    );
};