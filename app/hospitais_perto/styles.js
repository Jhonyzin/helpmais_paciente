import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");
const topo = Constants.statusBarHeight;


export const styles = StyleSheet.create({
  cor: {
    flex: 1,
    backgroundColor: "#1c2c41",
    alignItems: "center",
    alignContent: "center",
  },
});