
import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { styles } from '../screens/styles'; 

export default function BotaoOpcao({ onPress, iconSource, label }) {
  return (
    <TouchableOpacity onPress={onPress} accessibilityLabel={`Ir para ${label}`}>
      <View style={styles.opcoes}>
        <Image source={iconSource} style={styles.img_options} resizeMode="contain" />
        <View style={styles.linha2} />
        <Text style={styles.texto}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}
