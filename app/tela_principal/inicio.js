import React, { useState } from 'react';
import { View, StatusBar, TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import icons from '../../constants/icons.js'
import { styles  } from './styles.js';



export default function Teladeinicio( { navigation } ){
  const [nome] = useState('JOAO PAULO SANTOS BOTELHO')
  
  return (
    
    <View style={styles.container}> 
      <StatusBar barStyle={'dark-content'} backgroundColor = "#004aad" hidden TouchableOpacity={0.1}/>
      <View style={styles.quadrado1} />

      <View>  
        <TouchableOpacity onPress={() => navigation.navigate('Config')}>
          <View style = {styles.quadrado}>
            <Image source={icons.iconprinperfil} style={styles.image_ico_perfil} resizeMode="contain"/>
            <Text style = {styles.quatext}> Olá,</Text>
            <Text style = {styles.textodonome} adjustsFontSizeToFit numberOfLines={1} minimumFontScale={0.7}>{nome ? nome: 'Carregando...'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style = {styles.linha}>
        <View style={styles.botaoComImagem}>
          <TouchableOpacity onPress={() => navigation.navigate('Histo')}>
            <View style={styles.opcoes}>
              <Image source={icons.iconmedicam} style={styles.img_options} resizeMode="contain"/>
              <View style = {styles.linha2}/>
              <Text style = {styles.texto}>Histórico de saúde</Text>
            </View>
          </TouchableOpacity>
        </View> 
  
        <TouchableOpacity onPress={() => navigation.navigate('Pulseira')}>
          <View style = {styles.opcoes}>
            <Image source = {icons.iconpulsiera} style = {styles.img_options} resizeMode = 'contain'/>
            <View style = {styles.linha2}/>
            <Text style = {styles.texto}>Minha Pulseira</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style = {styles.linha}>
        <TouchableOpacity onPress={ () => navigation.navigate('Medicamentos')}>
          <View style = {styles.opcoes}>
            <Image source={icons.iconmed} style = {styles.img_options} resizeMode = 'contain'/>
            <View style = {styles.linha2}/>
            <Text style = {styles.texto}>Meus Medicamentos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Hospit')}>
          <View style = {styles.opcoes}>
            <Image source={icons.iconhospital} style = {styles.img_options} resizeMode='contain'/>
            <View style={styles.linha2}/>
            <Text style={styles.texto}>Hospitais Perto</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}