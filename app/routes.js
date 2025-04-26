import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Teladeinicio from "../app/tela_principal/inicio.js"
import Medicamentos from "../app/meus_medicamentos/med.js";

const Stack = createNativeStackNavigator();

function Routes() {

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name = "inicio" component={Teladeinicio}
                options={{
                    headerShown: false,
                }}/>
                <Stack.Screen name = "meusmedicamentos" component={Medicamentos} 
                options={{
                    headerShown: false,
                }}/> 
            </Stack.Navigator>
        </NavigationContainer>
)}

export default Routes;