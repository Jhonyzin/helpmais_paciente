import { View, Text, Image, StatusBar, TouchableNativeFeedback } from "react-native";
import Swiper from "react-native-swiper";
import { useNavigation } from '@react-navigation/native';
import React from "react";
import { styles } from './styles'; 
import icons from "../constants/icons.js"
export default function Index() {
  const navigation = useNavigation();

  const navigateToinicio = () => {
    navigation.navigate('Inicio');
  };
  const navigateToLogin = () => {
    navigation.navigate('Login'); 
  };
  const navigateTocadastro = () => {
    navigation.navigate('Cadastro'); 
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor="#004aad" />
      <Swiper autoplay={true} loop={true}>
        <View>
          <Image source={icons.logo1} style={styles.logos} resizeMode="stretch" />
        </View>
        <View>
          <Image source={icons.logo2} style={styles.logos} resizeMode="stretch" />
        </View>
        <View>
          <Image source={icons.logo3} style={styles.logos} resizeMode="stretch" />
        </View>
      </Swiper>

      <View style={styles.containers}>
        <Text style={styles.title}>Vamos começar?</Text>
        <View style={styles.botaobom}>
          <TouchableNativeFeedback onPress={navigateToLogin}>
            <View style={styles.butons}>
              <Text style={styles.texte}>Iniciar Sessão</Text>
            </View>
          </TouchableNativeFeedback>
          <View style={styles.spacer} />
          <TouchableNativeFeedback onPress={navigateTocadastro}>
            <View style={styles.butons}>
              <Text style={styles.texte}>Criar uma conta</Text>
            </View>
          </TouchableNativeFeedback>
          </View>
      </View>
      
    </>
  );

}