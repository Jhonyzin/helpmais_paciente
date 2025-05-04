import Cadastro from './app/Cadastro';
import Config from './app/Config';
import Hist from './app/Hist';
import Hospitais from './app/Hospitais';
import Index from './app/Index';
import Inicio from './app/Inicio';
import Login from './app/Login';
import Logo1 from './app/Logo1';
import Medicamentos from './app/Medicamentos';
import Pulseira from './app/Pulseira';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Logo1" component={Logo1} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Hospitais" component={Hospitais} />
        <Stack.Screen name="Historico" component={Hist} />
        <Stack.Screen name="Medicamentos" component={Medicamentos} />
        <Stack.Screen name="Pulseira" component={Pulseira} />
        <Stack.Screen name="Config" component={Config} />
        <Stack.Screen name="Index" component={Index} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
