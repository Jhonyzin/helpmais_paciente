import { View, Image, StyleSheet, StatusBar } from "react-native";
import { useEffect } from "react";
import icons from "../constants/icons.js"

export default function Logo( {navigation} ){
      useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace("Logo2");
        }, 3000);

        return () => clearTimeout(timer);
      }, []);
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#004aad" />
        <Image source={icons.iconlogo} style={styles.imagem} resizeMode="contain"/>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#004aad",
  },
  imagem: {
    width: "100%",
    height: "50%",
  },
});