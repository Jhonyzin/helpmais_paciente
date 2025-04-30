import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from "expo-constants";

export const styles = StyleSheet.create({

   logos: {
    width: "100%",
    height: "100%",

    },
    
    iconEye: {
      width: 24,
      height: 24,
    },
    
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 15,
      marginVertical: 10,
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 10,
      tintColor: '#666'
    },
    container: {
      flex: 1,
      backgroundColor: '#004aad',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    imagem: {
      width: 250,
      height: 250,
      marginBottom: 30,
    },
    containers: {
      justifyContent: "center",
      position: "absolute",
      top: "40%",
      width: "100%",
      alignItems: "center",
    },
    input: {
      flex: 1,
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 15,
      marginVertical: 10,
      fontSize: 16,
    },
    botao: {
      width: '100%',
      height: 50,
      backgroundColor: '#002b80',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    botaobom: {
      flexDirection: "row",
      marginTop: 20,
    },
    texte: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#FFF",
    },
    textoBotao: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    spacer: {
      width: 20,
    linkTexto: {
      color: '#fff',
      marginTop: 15,
      textDecorationLine: 'underline',
    },
  }
});
  
  export default styles;