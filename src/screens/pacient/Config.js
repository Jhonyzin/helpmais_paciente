import { View, Text} from "react-native";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import Botaoconfig from "../../components/botaoconfig";
import icons from "../../constants/icons";

export default function Config() {
    const navigation = useNavigation()
    const navigateTodados = () => {
        navigation.navigate('Dados')
    }
    const navigateToAssec = () => {
        navigation.navigate('Assec')
    }
    const navigateToSegu = () => {
        navigation.navigate('Seguranca')
    }

     return (
       <View style={styles.configura}>
         <Botaoconfig
           texto="Dados Pessoais"
           imagem={icons.iconperfil}
           press={navigateTodados}
           config={{width: '100%'}}
         />

         <Botaoconfig
           texto="Acessibilidade"
           imagem={icons.iconasse}
           press={navigateToAssec}
           config={{width: '100%'}}
         />

         <Botaoconfig
           texto="Segurança"
           imagem={icons.iconsegu}
           press={navigateToSegu}
           config={{width: '100%'}}
         />
       </View>
     );
}