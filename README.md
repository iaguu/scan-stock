# Aplicativo de Leitura de Código de Barras e Lista de Compra

Este é um aplicativo de leitura de código de barras e lista de compras desenvolvido com a biblioteca React Navigation. O aplicativo permite aos usuários escanear códigos de barras de produtos, adicionar itens à lista de compras e gerenciar as configurações do aplicativo.

## Instalação

Para utilizar este aplicativo, siga as etapas abaixo:

1. Certifique-se de ter o ambiente de desenvolvimento React Native configurado em sua máquina.
2. Clone este repositório em seu ambiente local.
3. Navegue até o diretório raiz do projeto.
4. Execute o seguinte comando para instalar as dependências do projeto:

```shell
npm install
```

5. Após a conclusão da instalação das dependências, execute o seguinte comando para iniciar o aplicativo:

```shell
npm start
```

Isso abrirá o Metro Bundler, que exibirá um código QR e opções para iniciar o aplicativo em um emulador ou dispositivo físico.

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

- `src/Screens/home.js`: Tela inicial do aplicativo.
- `src/Screens/items.js`: Tela de exibição dos itens.
- `src/Screens/camera.js`: Tela de captura de imagem da câmera.
- `src/Screens/add.js`: Tela de adição de um novo item à lista.
- `src/Screens/manualAdd.js`: Tela de adição manual de um novo item à lista.
- `src/Screens/shopping.js`: Tela de visualização da lista de compras.
- `src/Screens/config.js`: Tela de configurações do aplicativo.
- `src/Screens/notifications.js`: Tela de notificações do aplicativo.

## Navegação

A navegação entre as telas é gerenciada pelo componente `StackNavigator` da biblioteca React Navigation. Cada tela é definida como um elemento do `Stack.Navigator` no componente `App`. As configurações de cada tela, como a exibição ou ocultação do cabeçalho, são definidas usando a propriedade `options`.

```javascript
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
          options={{ headerShown: false }} // Configurações da tela de navegação  // Tela de notificações do aplicativo
          name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## Contribuindo

Se desejar contribuir para este projeto, siga as etapas abaixo:

1. Faça um fork deste repositório e clone-o em seu ambiente local.
2. Crie uma branch para suas alterações:

```shell
git checkout -b minha-branch
```

3. Faça as alterações desejadas e faça commit das mesmas:

```shell
git commit -m "Minha contribuição"
```

4. Envie as alterações para o seu repositório remoto:

```shell
git push origin minha-branch
```

5. Abra um pull request neste repositório, descrevendo suas alterações e contribuições.

Agradecemos antecipadamente por suas contribuições!

## Licença

Este projeto está licenciado sob a licença [MIT](LICENSE). Sinta-se à vontade para utilizar, modificar e distribuir este aplicativo conforme necessário.
