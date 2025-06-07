import { View, Image, StyleSheet, StatusBar } from "react-native";
import { useEffect } from "react";
import icons from "../constants/icons.js"
import { useNavigation } from '@react-navigation/native';

export default function Logo(){
      const navigation = useNavigation();

      useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace("Index");
        }, 3000);

        return () => clearTimeout(timer);
      }, []);

    
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
        <StatusBar backgroundColor="#004aad" />
        <Image source={icons.iconlogo} style={{width: 180, height: 180, resizeMode: 'contain'}} resizeMode="contain"/>
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