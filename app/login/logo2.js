import { View, Text, Image, StyleSheet, StatusBar, TouchableNativeFeedback } from "react-native";
import Swiper from "react-native-swiper";
import icons from "../../constants/icons.js"

export default function Swipers () {
    return (
    <>
        <StatusBar barStyle={'dark-content'} backgroundColor = "#004aad"  TouchableOpacity={0.1}/>
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
            <TouchableNativeFeedback style = {styles.butons}>
                <View style = {styles.butoncontante}>
                    <Text style = {styles.texte}>Iniciar Sessão</Text>
                </View>
            </TouchableNativeFeedback>
            <View style={styles.spacer} />
            <TouchableNativeFeedback style = {styles.butons}>
                <View style = {styles.butoncontante}>
                    <Text style = {styles.texte}>Criar uma conta</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    </>
    );
}

const styles = StyleSheet.create({
  logos: {
    width: "100%",
    height: "100%",
  },
  containers: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: "absolute",
    top: "50%",
    left: '50%',
    width: "40%",
    alignItems: "center",
    backgroundColor: "#FFF",

  },
  texte: {
    fontSize: 20,
    fontWeight: "bold",
  },
  butons: {
    width: 10,
    height: "20%",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#004aad",
    borderRadius: 5,
    backgroundColor: "transparent", 
    alignItems: "center",
    justifyContent: "center",
  },
  butoncontante: {
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%'
  },
spacer: {
    width: 30,
  },
});

