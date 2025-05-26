import React from "react";
import styles from "../styles";
import { View, Text } from "react-native";
import {useNavigation} from '@react-navigation/native';


export default function Dados(){
  return(
    <View style={[styles.container, {backgroundColor: '#1c2c41'}]}>
      <Text style={styles.texto}>bom dia</Text>
    </View>
    );
}