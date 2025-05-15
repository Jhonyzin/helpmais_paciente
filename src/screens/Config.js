import { View,Text} from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Config() {
  const navigation = useNavigation();

  return (
   <View style={[styles.container, paddingHorizontal = 20]}>
      <Text style={styles.texto}>config</Text>
   </View>
)
}