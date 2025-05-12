import { View, Image, StyleSheet, StatusBar } from "react-native";
import { useEffect } from "react";
import icons from "../constants/icons.js"
import { useNavigation } from '@react-navigation/native';

export default function Logo(){
      const navigation = useNavigation();
      useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace("Logo2");
        }, 3000);

        return () => clearTimeout(timer);
      }, []);
    return (
      <View style={[styles.container, paddingHorizontal = 20]}>
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