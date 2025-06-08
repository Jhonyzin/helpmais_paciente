import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cadastro from './screens/Cadastro';
import CadastroMedico from './screens/CadastroMedico';
import Config from './screens/pacient/Config';
import Historico from './screens/pacient/Historico';
import Hospitais from './screens/pacient/Hospitais';
import Index from './screens/Index';
import Inicio from './screens/pacient/Inicio';
import InicioMedico from "./screens/medic/InicioMedico";
import Login from './screens/Login';
import Logo1 from './screens/Logo1';
import Medicamentos from './screens/pacient/Medicamentos';
import Pulseira from './screens/pacient/Pulseira';
import Dados from './screens/pacient/Dados';
import Seguranca from './screens/pacient/Seguranca';
import Assec from './screens/pacient/Assec';
import HistoricoMedico from './screens/medic/HistoricoMedico';
import InformacoesMedico from './screens/medic/InformacoesMedico';
import InformacoesConsulta from './screens/pacient/InformacoesConsulta';
import DadosMedico from './screens/medic/DadosMedico';


const Stack = createNativeStackNavigator();

export default function App() {

  return (  
    <NavigationContainer>
      <Stack.Navigator id="mainStack" initialRouteName="Logo1" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Logo1" component={Logo1} />
        <Stack.Screen name="InformacoesConsulta" component={InformacoesConsulta} />
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Login" component={Login}
        options={{
            headerShown: true,
            title: 'Login',
            headerTintColor: "#FFF",
            headerStyle: { 
              backgroundColor: '#004aad'
            }
          }}
        />

        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro} 
          
          options={{
            headerShown: true, 
            title: 'Cadastro', 
            headerTintColor : '#FFF',
            headerStyle: { 
              backgroundColor: '#004aad'
        }}}/>

        <Stack.Screen name="Inicio" component={Inicio} />

        <Stack.Screen name="InicioMedico" component={InicioMedico} />
        <Stack.Screen name="CadastroMedico" component={CadastroMedico}/>
        <Stack.Screen name="HistoricoMedico" component={HistoricoMedico}/>
        <Stack.Screen name="InformacoesMedico" component={InformacoesMedico} />
        <Stack.Screen name="DadosMedico" component={DadosMedico} />
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
            name='Dados'
            component={Dados}
            options={{
              headerShown: true,
              title: 'Dados Pessoais',
              headerStyle: {
                backgroundColor: '#004aad',
              },
              headerTintColor: '#FFF',
            }}
          />

          <Stack.Screen
            name='Assec'
            component={Assec}
            options={{
              headerShown: true,
              title: 'Acessibilidade',
              headerStyle: {
                backgroundColor: '#004aad',
              },
              headerTintColor: '#FFF',
            }}
          />

          <Stack.Screen
            name='Seguranca'
            component={Seguranca}
            options={{
              headerShown: true,
              title: 'Segurança',
              headerStyle: {
                backgroundColor: '#004aad',
              },
              headerTintColor: '#FFF'
            }}
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
}