import React, { useState } from 'react';
import { View, StatusBar, TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import icons from '../../constants/icons.js'
import { styles  } from './styles.js';

export default function Teladeinicio(props){
  const [nome] = useState('JOAO PAULO SANTOS BOTELHO')
  
  function meusmedi(){
    props.navigation.navigate("meusmedicamentos");
  }

  return (
    
    <View style={styles.container}> 
      <StatusBar barStyle={'dark-content'} backgroundColor = "#004aad" hidden TouchableOpacity={0.1}/>
      <View style={styles.quadrado1} />

      <View>  
        <TouchableOpacity>
          <View style = {styles.quadrado}>
            <Image source={icons.icoprinperfil} style={styles.image_ico_perfil} resizeMode="contain"/>
            <Text style = {styles.quatext}> Olá,</Text>
            <Text style = {styles.textodonome} adjustsFontSizeToFit numberOfLines={1} minimumFontScale={0.7}>{nome ? nome: 'Carregando...'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style = {styles.linha}>
        <View style={styles.botaoComImagem}>
          <TouchableOpacity>
            <View style={styles.opcoes}>
              <Image source={icons.icomedicam} style={styles.img_options} resizeMode="contain"/>
              <View style = {styles.linha2}/>
              <Text style = {styles.texto}>Histórico de saúde</Text>
            </View>
          </TouchableOpacity>
        </View> 
  
        <TouchableOpacity>
          <View style = {styles.opcoes}>
            <Image source = {icons.icopulsiera} style = {styles.img_options} resizeMode = 'contain'/>
            <View style = {styles.linha2}/>
            <Text style = {styles.texto}>Minha Pulseira</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style = {styles.linha}>
        <TouchableOpacity onPress={meusmedi}>
          <View style = {styles.opcoes}>
            <Image source={icons.icomed} style = {styles.img_options} resizeMode = 'contain'/>
            <View style = {styles.linha2}/>
            <Text style = {styles.texto}>Meus Medicamentos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style = {styles.opcoes}>
            <Image source={icons.icohospital} style = {styles.img_options} resizeMode='contain'/>
            <View style={styles.linha2}/>
            <Text style={styles.texto}>Hospitas Perto</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}