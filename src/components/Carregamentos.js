import React, { useState, useEffect} from "react";
import { View, ActivityIndicator, Text, Modal } from "react-native";
import styles from "../screens/styles";

export default function Modallogin({ visible }){
    const [mensagem, setMensagem] = useState('Aguarde, estamos processando a entrada. Isso dependerá da sua conexão de internet.');

    useEffect(() =>{
        let timeout;
        
        if (visible){

            timeout = setTimeout(() => {
                setMensagem('Pedimos desculpas pela demora, estamos tentando buscar as informações... Isso pode levar alguns segundos.')
            }, 3000)
        }
        else{
            setMensagem('Aguarde, estamos processando a entrada. Isso dependerá da sua conexão de internet.')
        }
    }, [visible])

    return(
        <Modal transparent={true} animationType="fade">
            <View style={styles.loginesmodal}>
                <View style={styles.loginesmodal2}>
                <View style={styles.logintext1}>
                    <Text style={styles.logintext}>{mensagem}</Text>
                </View>
                <View style={styles.loginagu}>
                    <ActivityIndicator size="large" color="#FFF"/>
                </View>
                </View>
            </View>
        </Modal>
    )
}