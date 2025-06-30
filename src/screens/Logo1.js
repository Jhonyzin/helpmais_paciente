import { View, Image, StatusBar } from "react-native";
import { useEffect } from "react";
import icons from "../constants/icons.js"
import { useNavigation } from '@react-navigation/native';

export default function Logo(){
      const navigation = useNavigation();

      useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace("Index");
        }, 3000);

        return () => clearTimeout(timer);
      }, []);

    
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#004aad'}}>
        <StatusBar backgroundColor="#004aad" />
        <Image source={icons.iconlogo} style={{width: '60%', height: '60%', resizeMode: 'contain', flex: 1}} resizeMode="contain"/>
      </View>
    );
}