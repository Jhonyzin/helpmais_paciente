import { Animated, Dimensions } from "react-native";

const {height, width} = Dimensions.get('window');

// Este local é destinado para colocar os códigos de animação. 

export const SuDe = (translateY, bgColor, onComplete = () => {}) => {
  //Animação para subir para cima de acordo com a fórumla: '-height * 0.2'.
  Animated.parallel([
    Animated.timing(translateY, {
      toValue: -height * 0.2,
      duration: 700,
      useNativeDriver: false, // deixei false aqui, isso pode perder um desempenho mas não é muita coisa, depois coloco dois Animated.View no Index.js
    }),
    Animated.timing(bgColor, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }),
  ]).start(onComplete);
};

export const Loginani = (translateY, bgColor, onComplete = () => {}) => {
  Animated.parallel([
    Animated.timing(translateY, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
    }),
    Animated.timing(bgColor, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
    }),
  ]).start(onComplete);
}