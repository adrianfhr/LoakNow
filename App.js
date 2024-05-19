import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LandingScreen from './screens/LandingScreen';
import CartScreen from './screens/CartScreen';
import SellProductScreen from './screens/SellProductScreen';
import {app, analytics, auth} from './firebase';
import BottomNav from './components/BottomNav';
import RequestProductScreen from './screens/RequestProductScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Landing" component={LandingScreen} options={{animationEnabled:false}} />
            <Stack.Screen name="Cart" component={CartScreen} options={{animationEnabled:false}} />
            <Stack.Screen name="SellProduct" component={SellProductScreen} options={{animationEnabled:false}} />
            <Stack.Screen name="RequestProduct" component={RequestProductScreen} options={{animationEnabled:false}} />


            
          </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
