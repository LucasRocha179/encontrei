import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { LogBox } from 'react-native';

import LoginScreen from './Login/login';
import HomeScreen from './Home/home';

LogBox.ignoreAllLogs();

if (__DEV__) {
  import('../ReactotronConfig')
    .then(() => {
      console.log('Reactotron Configured')
    })
    .catch(() => console.error)
}

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Home: {
      screen: HomeScreen,
    }
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(AppNavigator);
