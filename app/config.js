import { View,Text} from "react-native";
import { styles } from "./styles";
import {useNavigation}

export default function Config() {
  const navigation = useNavigation();
  return (
  <View style={styles.cor}>
   <Text style={styles.texte}>config</Text>
  </View>
)
}