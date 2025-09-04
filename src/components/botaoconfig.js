import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import {styles} from '../screens/styles';
import icons from '../constants/icons';


export default function Botaoconfig({texto, imagem, press, config}) {
  return (
    <TouchableOpacity
      onPress={press}
      style={[styles.botaoconfigura, config]}>
      <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
        <Image source={imagem} style={{height: 50, width: 50}} />
        <Text style={[styles.textoconfig, {flex: 1}]}>{texto}</Text>
        <Image
          source={icons.iconseta}
          style={{width: 38, height: 50}}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}
