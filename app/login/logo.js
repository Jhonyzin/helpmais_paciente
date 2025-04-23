import { View, Image, StyleSheet, StatusBar } from 'react-native';
import icons from '../../constants/icons';

export default function logo() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor = "#004aad" TouchableOpacity={0.1}/>
      <Image 
        source={icons.icologo} 
        style={styles.imagem} 
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004aad',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: 400,
    height: 400,
  },
});
