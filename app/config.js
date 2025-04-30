import { View,Text} from "react-native";
import { styles } from "./styles";
import { useRouter } from 'expo-router';

export default function Config() {
 const router = useRouter();
  return (
  <View style={styles.cor}>
   <Text style={styles.texte}>config</Text>
  </View>
)
}