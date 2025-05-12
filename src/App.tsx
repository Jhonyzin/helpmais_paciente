import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
>>>>>>> 360772c (historicao)
>>>>>>> 9c7331c (historicaoss)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import Informacoes from './screens/Informacoes';


>>>>>>> 360772c (historicao)
>>>>>>> 9c7331c (historicaoss)

const Stack = createNativeStackNavigator();

export default function App() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9c7331c (historicaoss)
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
<<<<<<< HEAD
=======
=======
  return (  
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Login" component={Login}/>

        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro} 
          options={{
            headerShown: true, 
            title: 'Cadastro', 
            headerStyle: { 
              backgroundColor: '#004aad'
        }}}/>

        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Logo1" component={Logo1} />
        <Stack.Screen 
          name="Config" 
          component={Config}
          options={{
            headerShown: true,
            title: 'Configurações',
            headerStyle: {
              backgroundColor: '#004aad',
            },
            headerTintColor: "#FFF"
          }}
          />

        <Stack.Screen 
          name="Historico" 
          component={Historico} 
          options={{
            headerShown: true, 
            title: 'Histórico', 
            headerStyle: { 
              backgroundColor: '#004aad',
        },
            headerTintColor: '#FFF',
        }}/>

        <Stack.Screen 
          name="Hospitais" 
          component={Hospitais}
          options={{
            headerShown: true,
            title: 'Hospitais por Perto',
            headerStyle: {
              backgroundColor: '#004aad',
            },
            headerTintColor: "#FFF"
          }}
          />

        <Stack.Screen 
          name="Pulseira" 
          component={Pulseira}
          options={{
            headerShown: true,
            title: 'Minha Pulseira',
            headerStyle: {
              backgroundColor: '#004aad',
            },
            headerTintColor: "#FFF",
          }}
          />
          
        <Stack.Screen 
          name="Medicamentos" 
          component={Medicamentos}
          options={{
            headerShown: true,
            title: 'Meus Medicamentos',
            headerStyle: {
              backgroundColor: '#004aad',
            },
            headerTintColor: '#FFF',
          }} />

          <Stack.Screen
            name='Informacoes'
            component={Informacoes}
            options={{
              headerShown: true,
              title: 'Histórico',
              headerStyle: { 
                backgroundColor: '#004aad',
              },
              headerTintColor: '#FFF',              
            }}
          />
>>>>>>> 360772c (historicao)
>>>>>>> 9c7331c (historicaoss)
      </Stack.Navigator>
    </NavigationContainer>
  );
}