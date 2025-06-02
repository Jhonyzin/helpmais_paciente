import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";

export default function Assec(){
    return (
      <View style={[styles.container, {backgroundColor: '#1c2c41'}]}>
        <Text style={styles.texto}>Assec?</Text>
      </View>
    );
}