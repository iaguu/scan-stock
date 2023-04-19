// Importando o componente NavigationContainer da biblioteca @react-navigation/native
import { NavigationContainer } from '@react-navigation/native';

// Importando o componente createStackNavigator da biblioteca @react-navigation/stack
import { createStackNavigator } from '@react-navigation/stack';

// Importando as telas do aplicativo
import Home from './src/Screens/home';
import Items from './src/Screens/items';
import Camera from './src/Screens/camera';
import Add from './src/Screens/add';
import ManualAdd from './src/Screens/manualAdd';
import Shopping from './src/Screens/shopping';
import Config from './src/Screens/shopping';
import Notifications from './src/Screens/notifications';

// Criando uma pilha de navegação com o createStackNavigator
const Stack = createStackNavigator();

// Exportando o componente App
export default function App() {
// Retornando um componente NavigationContainer que contém um StackNavigator
return (
<NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen
        options={{ headerShown: false }} // Configurações da tela de navegação // Tela inicial do aplicativo
        name="Home" component={Home} /> 
        <Stack.Screen
        options={{ headerShown: false }} // Configurações da tela de navegação // Tela de exibição dos itens
        name="Items" component={Items} /> 
        <Stack.Screen
        options={{ headerShown: false }} // Configurações da tela de navegação // Tela de captura de imagem da câmera
        name="Camera" component={Camera} /> 
        <Stack.Screen
        options={{ headerShown: false }} // Configurações da tela de navegação  // Tela de adição de um novo item à lista
        name="Add" component={Add} />
        <Stack.Screen
        options={{ headerShown: false }} // Configurações da tela de navegação // Tela de visualização da lista de compras
        name="Shopping" component={Shopping} /> 
        <Stack.Screen
        options={{ headerShown: false }} // Configurações da tela de navegação // Tela de configurações do aplicativo
        name="Config" component={Config} /> 
        <Stack.Screen
        options={{ headerShown: false }} // Configurações da tela de navegação  // Tela de adição manual de um novo item à lista
        name="ManualAdd" component={ManualAdd} />
        <Stack.Screen
        options={{ headerShown: false }} // Configurações da tela de navegação  // Tela de adição manual de um novo item à lista
        name="Notifications" component={Notifications} />
    </Stack.Navigator>
</NavigationContainer>
);
}