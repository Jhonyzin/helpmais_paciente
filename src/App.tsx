import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import React from 'react';
import Cadastro from './screens/Cadastro';
import Config from './screens/Config';
import Historico from './screens/Historico';
import Hospitais from './screens/Hospitais';
import Index from './screens/Index';
import Inicio from './screens/Inicio';
import Login from './screens/Login';
import Logo1 from './screens/Logo1';
import Medicamentos from './screens/Medicamentos';
import Pulseira from './screens/Pulseira';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Index" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Logo1" component={Logo1} />
        <Stack.Screen name="Config" component={Config} />
        <Stack.Screen name="Historico" component={Historico} />
        <Stack.Screen name="Hospitais" component={Hospitais} />
        <Stack.Screen name="Pulseira" component={Pulseira} />
        <Stack.Screen name="Medicamentos" component={Medicamentos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}