import { View, StatusBar, Text } from "react-native";
import { styles } from "../styles";
import { useNavigation } from '@react-navigation/native';

import Med from "../../components/Med";
import icons from "../../constants/icons";

export default function Medicamentos (){
    const navigation = useNavigation();

  return (
    <View style={{backgroundColor: '#004aad', flex: 1}}>
      <StatusBar backgroundColor="#004aad" barStyle="dark-content" />

      <View style={styles.medcontai}>
        <Med
          imagem={icons.iconcancelar}
          nome="Dipirona"
          info="10 gotas por dia"
        />
      </View>
    </View>
  );
};

