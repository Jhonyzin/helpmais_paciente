import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import icons from '../../constants/icons.js'
import Constants from 'expo-constants'

const { width, height } = Dimensions.get('window')
const topo = Constants.statusBarHeight;


export default function teladeinicio(){
  const [nome] = useState('JOAO PAULO SANTOS BOTELHO')
  
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
{/* VOU MEXER NESSA PARTE, PARTE DE CIMA INTERDITADA */}


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
        <TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c2c41",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image_ico_perfil: {
    width: 80,
    height: 80,
    marginTop: topo - 20,
    paddingLeft: 100
  },
  textodonome: {
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: 50,
    fontSize: 40,
    width: 300,
  },
  quadrado1: {
    position: "absolute",
    width: width,
    height: 110,
    backgroundColor: "#004aad",
    marginTop: topo - 70,
  },
  quadrado: {
    width: width * 0.9,
    height: 150,
    backgroundColor: "#7cb4ff99",
    borderRadius: 20,
    marginTop: topo - 20,
  },
  quatext: {
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  opcoes: {
    width: width * 0.4,
    height: 160,
    borderRadius: 20,
    backgroundColor: "#004aad",
    alignContent: "center",
    alignItems: "center",
  },
  linha: {
    marginTop: topo,
    flexDirection: "row",
    gap: 30,
  },
  img_options: {
    width: 150,
    height: 105,
    marginTop: topo - 35,
  },
  botaoComImagem: {
    alignItems: "center",
  },
  linha2: {
    width: 135,
    height: 5,
    backgroundColor: "#80a6a6a6",
    borderRadius: 20,
  },
  texto: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    marginTop: topo - 25,
  },
});


// o que fazer?
// terminar o principal botão e depois criar os outros. Por fim, tirar todos os styles e passar para um componets. Terminar os últimos dois botões