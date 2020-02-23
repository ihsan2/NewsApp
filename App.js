import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';

// import store
import store from './src/public/redux/store';

//import screen
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Detail from './src/screens/Detail';
import WebDetail from './src/components/WebDetail';
import Splash from './src/screens/Splash';

const Stack = createStackNavigator();

// wrap all component with redux Provider and the store
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MenuProvider>
          <Root>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Detail" component={Detail} />
                <Stack.Screen name="WebDetail" component={WebDetail} />
              </Stack.Navigator>
            </NavigationContainer>
          </Root>
        </MenuProvider>
      </Provider>
    );
  }
}
