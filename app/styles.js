import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet,Dimensions  } from 'react-native';
import Constants from "expo-constants";
const { width } = Dimensions.get('window');
const topo = 40;
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
    botaoComImagem: {
      alignItems: "center",
    },
    linha2: {
      width: 135,
      height: 5,
      backgroundColor: "#80a6a6a6",
      borderRadius: 20,
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
    image_ico_perfil: {
      width: 80,
      height: 80,
      marginTop: topo - 20,
      paddingLeft: 100,
    },
    textodonome: {
      fontWeight: "bold",
      color: "#fff",
      paddingLeft: 50,
      fontSize: 40,
      width: 300,
    },
    quadrado: {
      width: width * 0.9,
      height: 150,
      backgroundColor: "#7cb4ff99",
      borderRadius: 20,
      marginTop: topo - 20,
    },
    quatext: {
      fontSize: 20,
      paddingLeft: 20,
      fontWeight: "bold",
      color: "#fff",
    },
    opcoes: {
      width: width * 0.4,
      height: 160,
      borderRadius: 20,
      backgroundColor: "#004aad",
      alignContent: "center",
      alignItems: "center",
    },
    linha: {
      marginTop: topo,
      flexDirection: "row",
      gap: 30,
    },
    img_options: {
      width: 150,
      height: 105,
      marginTop: topo - 35,
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