<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9c7331c (historicaoss)
import { View ,Text} from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Historico() {
    const navigation = useNavigation();
    return(
    <View style = {styles.cor}>
        <Text style={styles.texte}>historico</Text>
    </View>

    );
<<<<<<< HEAD
}
=======
}
=======
import { View ,Text, Button} from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Botaoconsultas from "../constants/consultas";
import React, { useState, useEffect } from 'react';
import Listadeconsultas from "./Listadeconsultas";

const { Navigator, Screen } = createMaterialTopTabNavigator()


export default function Historico() {
    const navigation = useNavigation();

    return(
        
        <Navigator screenOptions={{
            tabBarInactiveTintColor: '#b8b8b8',
            tabBarActiveTintColor: '#FFF',
            tabBarLabelStyle: {
                fontSize: 15,
                fontWeight: 'bold',
            },
            tabBarIndicatorContainerStyle: {
                backgroundColor: '#004aad'
            },
            tabBarIndicatorStyle: {
                backgroundColor: '#7ed957',
                height: 4
            },
        }}>
            <Screen name="Todas" component={Todas}/>
            <Screen name="Em andamento" component={Emandamento}/>
            <Screen name="Encerradas" component={Encerradas}/>
        </Navigator>
    );
};


function Todas(){
    return(
    <View style={styles.historicocontainer}>
        <Botaoconsultas
        nome="Jaime"
        cargo="Cardiologista"
        tempo="1 mês"
        horario="14:20"
        valor="R$10000"
        imagemdeendamento={true}
        corbarra="#7ed957"
        />
        
    </View>
    )
}
function Emandamento(){
    const navigation = useNavigation();
    const navigateTohisto = () => {
            navigation.navigate('Informacoes')
        };
    return (
    <View style={styles.historicocontainer}>
        <Button title="Ir para Info" onPress={navigateTohisto}/>
    </View>
    )
}
function Encerradas( filtro ){
    return (
        <Listadeconsultas filtro="encerradas"/>
    )
}
>>>>>>> 360772c (historicao)
>>>>>>> 9c7331c (historicaoss)
