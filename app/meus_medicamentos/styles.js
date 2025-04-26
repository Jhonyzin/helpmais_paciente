import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");
const topo = Constants.statusBarHeight;

export const styles = StyleSheet.create({
  ds: {
    flex: 1,
    backgroundColor: "#1c2c41",
    alignItems: "center",
    alignContent: "center",
  },
  quadrado1: {
    width: width,
    height: 150,
    marginTop: topo - 70,
    backgroundColor: "#004aad",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: topo + 40,
    paddingLeft: 50,
    color: '#FFF'
  },
});