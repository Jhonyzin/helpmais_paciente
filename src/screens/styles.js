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
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    height: 48,
    minHeight: 48,
    maxHeight: 48,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 8,
    alignSelf: 'center',
    tintColor: '#004aad',
  },
  container: {
    flex: 1,
    backgroundColor: '#1c2c41',
  },
  status: {
<<<<<<< HEAD
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    alignSelf: 'flex-start',
=======
    width: 75,
    height: 30,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
>>>>>>> df396284ddffb70f53002c02f5013bfa361b3ab4
  },
  botaoDesabilitado: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
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
    color: '#FFF',
    fontSize: 14,
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
    width: '90%',
<<<<<<< HEAD
    height: 120,
=======
    height: '20%',
>>>>>>> df396284ddffb70f53002c02f5013bfa361b3ab4
    overflow: 'hidden',
    flexDirection: 'row',
    borderRadius: 15,
    marginVertical: 8,
  },
  dentrodobota: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
  imgconsul: {
<<<<<<< HEAD
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10,
=======
    height: 90,
    width: 90,
    marginTop: topo - 40,
    borderRadius: 50,
    marginLeft: 5
>>>>>>> df396284ddffb70f53002c02f5013bfa361b3ab4
  },
  Bar: {
    width: 8,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textoconsul: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  especialidadetext: {
    color: '#a6a6a6',
    fontSize: 12,
    marginTop: 2,
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
    height: 16,
    width: 16,
    marginRight: 5,
  },
  textos: {
    marginTop: 17,
    marginLeft: 5,
  },
  textosDistantes: {
    marginTop: 17,
    marginLeft: 85,
  },
  imghisto: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  pedir: {
    width: '100%',
    height: 120,
    backgroundColor: '#004aad',
    flexDirection: 'row',
    borderRadius: 10,
  },
  cadastrar: {
    backgroundColor: '#b3b1ad',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  inform: {
    width: '100%',
    flexShrink: 1,
    height: 60,
    backgroundColor: '#004aad',
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  informtext: {
    fontSize: 13,
    color: '#FFF',
    flex: 1,
    flexWrap: 'wrap',
  },
  modalnfc: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalnfc2: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '30%',
  },
  botaofechar: {
    backgroundColor: '#004aad',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
  },
  titlesmodal: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e83427',
  },
  mktimg: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
  tempul1: {
    backgroundColor: '#2e2e2e',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempul2: {
    backgroundColor: '#3b3b3b',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 50,
  },
  imgtempul: {
    borderRadius: 20,
    backgroundColor: '#2e2e2e',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempulblock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 10,
    marginLeft: 10,
  },
  headerConsulta: {
    width: '100%',
    backgroundColor: '#2a3c54',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  headerInfo: {
    marginBottom: 16,
  },
  perfilContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoContainer: {
    marginLeft: 12,
    flex: 1,
  },
  secao: {
    width: '100%',
    backgroundColor: '#2a3c54',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  textoConteudo: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 4,
  },
  receitaContainer: {
    backgroundColor: '#3a4c64',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  medicamento: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  cargotext: {
    fontSize: 14,
    color: '#a6a6a6',
  },
});

export default styles;