import { View, StatusBar, Text } from "react-native";
import { styles } from "./styles";
import { useNavigation } from '@react-navigation/native';

export default function Medicamentos (){
    const navigation = useNavigation();

  return (
    <View style = {[styles.container, {paddingHorizontal: 20, backgroundColor: "#1c2c41"}]}>
      <Text>Medicamentos</Text>
    </View>
  );
};

