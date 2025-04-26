import Constants from "expo-constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const topo = Constants.statusBarHeight;

export const styles = {
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
    paddingLeft: 100,
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
};
