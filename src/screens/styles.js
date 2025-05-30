
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const topo = 40;

export const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#ffff',
  },

  logos: {
    width: '100%',
    height: '100%',
  },

  iconEye: {
    width: 24,
    height: 24,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: '#666',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  status: {
    width: 70,
    height: 30,
    borderRadius: 10,
    left: 5,
    marginTop: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  containers: {
    justifyContent: 'center',
    position: 'absolute',
    top: '40%',
    width: '80%',
    left: '10%',
    alignItems: 'center',
    backgroundColor: '#D0D9E7CC',
    height: '20%',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
  },
  botao: {
    width: '100%',
    height: 50,
    backgroundColor: '#002b80',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  botaoComImagem: {
    alignItems: 'center',
  },
  linha2: {
    width: 135,
    height: 5,
    backgroundColor: '#80a6a6a6',
    borderRadius: 20,
  },
  botaobom: {
    flexDirection: 'row',
    marginTop: 20,
  },
  texto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  textocinza: {
    fontSize: 16,
    marginVertical: 0,
    fontWeight: 'bold',
    color: '#000',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image_ico_perfil: {
    width: 80,
    height: 80,
    marginTop: topo - 20,
    borderRadius: 35,
    overflow: 'hidden',
    left: 5,
  },
  textodonome: {
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 50,
    top: width * 0.03,
    fontSize: 20,
    width: 300,
    maxWidth: '100%',
  },
  quadrado: {
    width: width * 0.9,
    height: 150,
    backgroundColor: '#7cb4ff99',
    borderRadius: 23,
    marginTop: topo - 20,
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  icondeitada: {
    position: 'absolute',
    height: height * 0.1,
    width: width * 0.27,
    top: width * 0.0001,
    left: height * 0.3,
  },
  quatext: {
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  opcoes: {
    width: width * 0.4,
    height: 160,
    borderRadius: 20,
    backgroundColor: '#004aad',
    alignContent: 'center',
    alignItems: 'center',
  },
  linha: {
    marginTop: topo,
    flexDirection: 'row',
    gap: 30,
  },
  img_options: {
    width: 120,
    height: 105,
    marginTop: topo - 35,
  },
  spacer: {
    width: 20,
  },
  linkTexto: {
    color: '#0000	',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  butons: {
    width: '40%',
    height: 70,
    backgroundColor: '#002855',
    borderWidth: 2,
    borderColor: '#004aad',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temp: {
    position: 'absolute',
    top: '10%',
    width: '100%',
  },
  historicocontainer: {
    backgroundColor: '#1c2c41',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    gap: 15,
  },
  botaconsu: {
    width: '80%',
    height: '20%',
    overflow: 'hidden',
    flexDirection: 'row',
    borderRadius: 15,
  },
  dentrodobota: {
    flexDirection: 'row',
  },
  imgconsul: {
    height: 90,
    width: 90,
    marginTop: topo - 40,
    borderRadius: 50,
  },

  Bar: {
    width: 10,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textoconsul: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: topo - 35,
    color: '#FFF',
  },
  especialidadetext: {
    color: '#a6a6a6',
    fontSize: 12,
  },
  tempo: {
    height: 20,
    width: 20,
    marginTop: 10,
    marginLeft: 100,
  },
  botaodentro: {
    backgroundColor: '#004aad',
    flex: 1,
  },
  tempo2: {
    height: 20,
    width: 20,
    marginLeft: 10,
    marginTop: 20,
  },
  textos: {
    marginTop: 17,
    marginLeft: 5,
  },
  textosDistantes: {
    marginTop: 17,
    marginLeft: 55,
  },
  imghisto: {
    width: '45%',
    height: '45%',
    marginTop: -70,
    marginLeft: -30,
  },
  tipoBotao: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#004aad',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  tipoBotaoAtivo: {
    backgroundColor: '#004aad',
  },

  tipoTexto: {
    color: '#004aad',
    fontWeight: 'bold',
  },

  tipoTextoAtivo: {
    color: '#fff',
  },
  maps: {
    flex: 1,
    height: height,
    width: width,
  },
  botaoconfigura: {
    marginTop: 20,
    borderRadius: 15,
    height: 70,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#004aad',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textoconfig: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 15,
  },
  configura: {
    backgroundColor: '#1c2c41',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  medbot: {
    alignItems: 'center',
    height: 100,
    width: '100%',
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: '#0658c6',
    paddingHorizontal: 10,
  },
  medview: {
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: -20,
  },
  medtext: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
  medcontai: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 10,
    marginTop: 20,
  },
});
  


  export default styles;