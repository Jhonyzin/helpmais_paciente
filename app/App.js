import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";

import Logo1 from "./login/logo1.js"
import Logo2 from "./login/logo2.js"
import Teladeinicio from "./tela_principal/inicio.js";
import Medicamentos from "./meus_medicamentos/med.js";
import TeladeLogin from "./login/login.js";
import Config from "./configuracoes/conifg.js"
import Hospit from "./hospitais_perto/hospitais.js"
import Pulseira from "./pulseira/pulseira.js"
import Histo from "./historico/hist.js"


const Stack = createNativeStackNavigator();

export default function App() {
    return (
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Logo1"
              component={Logo1}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Logo2"
              component={Logo2}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TeladeLogin"
              component={TeladeLogin}
              options={{
                title: "Login",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#004aad",
                },
                headerTintColor: "#FFF",
                statusBarBackgroundColor: "#004aad",
              }}
            />
            <Stack.Screen
              name="Teladeinicio"
              component={Teladeinicio}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Medicamentos"
              component={Medicamentos}
              options={{
                title: "MEUS MEDICAMENTOS",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#004aad",
                },
                headerTintColor: "#FFF",
                statusBarBackgroundColor: "#004aad",
              }}
            />
            <Stack.Screen
              name="Config"
              component={Config}
              options={{
                title: "CONFIGURAÇÕES",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#004aad",
                },
                headerTintColor: "#FFF",
                statusBarBackgroundColor: "#004aad",
              }}
            />
            <Stack.Screen
              name="Hospit"
              component={Hospit}
              options={{
                title: "HOSPITAIS POR PERTO",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#004aad",
                },
                headerTintColor: "#FFF",
                statusBarBackgroundColor: "#004aad",
              }}
            />
            <Stack.Screen
              name="Pulseira"
              component={Pulseira}
              options={{
                title: "MINHA PULSEIRA",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#004aad",
                },
                headerTintColor: "#FFF",
                statusBarBackgroundColor: "#004aad",
              }}
            />
            <Stack.Screen
              name="Histo"
              component={Histo}
              options={{
                title: "Histórico de Saúde",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#004aad",
                },
                headerTintColor: "#FFF",
                statusBarBackgroundColor: "#004aad",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    );
}