import { 
  View, 
  Text, 
  Image, 
  StatusBar, 
  TouchableNativeFeedback, 
  Animated
 } from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from './styles'; 
import icons from "../constants/icons.js"
import { SuDe } from "../utils/Animations";

export default function Index() {
  const navigation = useNavigation();
  const bgColor = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;


  const cordefundo = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#80a6a6a6', '#FFF'],
  });

  const navigateToLogin = () => {
    SuDe(translateY, bgColor, () => {
      setTimeout(() => {
        navigation.navigate('Login'); 
      }, 150)
    })
  };

  const navigateTocadastro = () => {
    SuDe(translateY, bgColor, () => {
      setTimeout(() => {
        navigation.navigate('Cadastro'); 
      }, 150)
    })
  };

  // resetar a animação
  useFocusEffect(
    useCallback(() => {
      translateY.setValue(0);
      bgColor.setValue(0);
    }, [translateY, bgColor])
  );


  return (
    <View style={styles.containers2}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#004aad" />

      <View style={styles.indexprimeiro}>
        <Image
          source={icons.iconlogo}
          style={styles.imgindex}
          resizeMode="contain"
        />
        <Text style={styles.texto}>Uma vida mais prática!</Text>
      </View>

      <Animated.View
        style={[
          styles.containers,
          {
            transform: [{translateY}],
            backgroundColor: cordefundo || '#80a6a6a6'}
          ]}>
        <View style={styles.containersindex}>
          <View style={styles.indextext}>
            <Text style={styles.title}>Vamos começar?</Text>
            <View style={styles.botaobom}></View>
          </View>

          <View style={styles.indexbotao}>
            <TouchableNativeFeedback onPress={navigateToLogin}>
              <View style={styles.butons}>
                <Text style={styles.texto}>Iniciar Sessão</Text>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={navigateTocadastro}>
              <View style={styles.butons}>
                <Text style={styles.texto}>Criar uma conta</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Animated.View>
    </View>
  );

}