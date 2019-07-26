/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import LoginScreen from './src/screens/Login'
import AdminScreen from './src/screens/Admin';
import {createStackNavigator, createAppContainer} from 'react-navigation';
const RootStack = createStackNavigator(
    {
      Login: {
          screen: LoginScreen
        },
        Admin: {
          screen: AdminScreen,
          navigationOptions: {
            title: 'Admin',
            headerTitleStyle :{color: 'white'},
          },
        },
    },
    {
      initialRouteName: 'Login',
    },
      {
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: 'blue',
          },
          headerTintColor: '#fff',
        },
        initialRouteName: 'Home',
      }
  );
  const AppContainer = createAppContainer(RootStack);
AppRegistry.registerComponent(appName, () => AdminScreen);
