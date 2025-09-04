import React from "react";
import styles from "../screens/styles";
import { View, Text, Image, TouchableOpacity } from "react-native";


export default function Med({imagem, nome, info, onPress}){
    return (
      <TouchableOpacity style={styles.medbot} onPress={onPress}>
        <Image source={imagem} style={{width: 70, height: 70}} resizeMode="contain"/>
        <View style = {styles.medview}>
          <Text style = {styles.medtext}>{nome}</Text>
          <Text style = {{ color: '#a6a6a6', fontSize: 15}}>{info}</Text>
        </View>
      </TouchableOpacity>
    );
}