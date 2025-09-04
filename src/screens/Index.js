import { 
  View, 
  Text, 
  Image, 
  StatusBar, 
  TouchableNativeFeedback, 
  Animated,
  FlatList,
  StyleSheet,
  Dimensions
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
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get('window')
  
  // const bgs será as backgrounds que ficarão atrás da imagem, 
  // cada cor está de acordo com as imagens, estão respectivamente. 
  // (Primeira cor, imagem help+, segunda cor, imagem da maleta e assim por diante...)
  const bgs = ['#E63946', '#4CC9F0', '#118AB2', '#FFB703'];
  const INFO = [ // textos abaixo:
    {
      // PRIMEIRA
      key: 'Primeira',
      title: 'Bem-Vindo(a) ao HELP+',
      discription:
        'Tenha todo o seu histórico de consultas e exames em um só lugar, de forma prática e segura.',
      image: icons.iconlogo,
    },
    {
      // SEGUNDA
      key: 'Segunda',
      title: 'Para médicos e Pacientes',
      discription:
        'Conecte-se em segundos: aproxime seu celular e compartilhe seu histórico médico com segurança e rapidez, sem formulários ou burocracia.',
      image: icons.iconsaudemaleta,
    },
    {
      // TERCEIRA
      key: 'Terceira',
      title: 'Histórico Completo',
      discription:
        'Acesse facilmente informações detalhadas sobre suas consultas passadas.',
      image: icons.makt1,
    },
    {
      // QUARTA
      key: 'Quarta',
      title: 'Pulseiras NFC',
      discription:
        'Tenha sua saúde no pulso o tempo todo: monitore sinais vitais e esteja preparado até para momentos de emergência.',
      image: icons.iconpulseira,
    },
  ];

  // Esse indicator é a bolinha
  const Indicator = ({scrollX}) => {
    return <View style={styles.logoindicator}>
      {INFO.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const escala = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });

        return <Animated.View
          key={`indicator-${i}`}
          style={[styles.styindicator, {transform: [{ scale: escala }], opacity}]}
        />
      })}
    </View>
  }

  const Square = ({ scrollX }) => {
    const backgroundColor = scrollX.interpolate({
      inputRange: bgs.map((_, i) => i * width),
      outputRange: bgs.map(bg => bg),
    });

    const YOLO = Animated.modulo(
      Animated.divide(
        Animated.modulo(scrollX, width),
        new Animated.Value(width),
      ),
      1,
    );

    const rotate = YOLO.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['-35deg', '35deg', '35deg']
    })
    return (
      <Animated.View
        style={[
          styles.squares, 
          {
            transform: [{rotate}], 
            backgroundColor
      
      }]}
      />
    )
  }


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
      <StatusBar barStyle={'dark-content'} />

      <Square scrollX={scrollX} />
      {/*PARTE 1*/}
      <Animated.FlatList
        data={INFO}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View style={styles.logoindex}>
              <View style={styles.cadstrods}>
                <Image source={item.image} style={styles.cadastroanim} />
              </View>

              <View>
                <Text style={{fontWeight: '800', color: '#FFF', fontSize: 22, marginLeft: 7}}>
                  {item.title}
                </Text>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={3}
                  minimumFontScale={0.7}
                  style={{color: '#FFF', marginLeft: 17}}>
                  {item.discription}
                </Text>
              </View>
            </View>
          );
        }}
      />
      
      <Indicator scrollX={scrollX} />

      {/*PARTE 2*/}
      <Animated.View
        style={[
          styles.containers,
          {
            transform: [{translateY}],
            backgroundColor: cordefundo || '#80a6a6a6',
          },
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