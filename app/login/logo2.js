import { View, Text, Image, StyleSheet, StatusBar, TouchableNativeFeedback } from "react-native";
import Swiper from "react-native-swiper";
import { useNavigation } from '@react-navigation/native';  
import icons from "../../constants/icons.js"

export default function Swipers() {  
    const navigation = useNavigation();  

    return (

    <>
        <StatusBar barStyle={'dark-content'} backgroundColor = "#004aad"  />
        <Swiper autoplay={true} loop={true}>
            <View>            
                <Image source={icons.logo1} style={styles.logos} resizeMode="stretch" />
            </View>
            <View>
                <Image source={icons.logo2} style={styles.logos} resizeMode="stretch" />
            </View>
            <View>
                <Image source={icons.logo3} style={styles.logos} resizeMode="stretch"/>
            </View>
        </Swiper>
        
        
        <View style = {styles.containers}>
          <Text style = {styles.title}>Vamos começar?</Text>
          <View style = {styles.botaobom}>
              <TouchableNativeFeedback onPress={ () => navigation.navigate('Teladelogin')}>
                  <View style = {styles.butons}>
                      <Text style = {styles.texte}>Iniciar Sessão</Text>
                  </View>
              </TouchableNativeFeedback>
              <View style={styles.spacer} />
              <TouchableNativeFeedback>
                  <View style = {styles.butons}>
                      <Text style = {styles.texte}>Criar uma conta</Text>
                  </View>
              </TouchableNativeFeedback>
            </View>
        </View>
    </>
    );
}

const styles = StyleSheet.create({
  logos: {
    width: "100%",
    height: "100%",
  },
  botaobom: {
    flexDirection: "row",
    marginTop: 20,
  },
  containers: {
    justifyContent: "center",
    position: "absolute",
    top: "40%",
    width: "100%",
    alignItems: "center",
  },
  texte: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  butons: {
    width: "40%",
    height: 70,
    backgroundColor: "#002855",
    borderWidth: 2,
    borderColor: "#004aad",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    width: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#FFF",
  },
});