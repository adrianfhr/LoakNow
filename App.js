import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LandingScreen from './screens/LandingScreen';
import CartScreen from './screens/CartScreen';
import SellProductScreen from './screens/SellProductScreen';
import RequestProductScreen from './screens/RequestProductScreen';
import ManageProductScreen from './screens/ManageProductScreen';
import ProfileScreen from './screens/ProfileScreen';
// import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { app, auth, storage } from './firebase' 
const Stack = createStackNavigator();

const App = () => {
  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  // useEffect(() => {
  //   if(requestUserPermission()){
  //     messaging()
  //       .getToken()
  //       .then(token => {
  //       console.log(token);
  //     });
  //   } else {
  //     console.log('Permission not granted', authStatus);
  //   }

  //   messaging()
  //     .getInitialNotification()
  //     .then(async (remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });
    
  //   // Asume a message-notification contains a "type" property in the data payload of the screen to open
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //   });

  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Landing" component={LandingScreen} options={{animationEnabled:false}} />
            <Stack.Screen name="Cart" component={CartScreen} options={{animationEnabled:false}} />
            <Stack.Screen name="SellProduct" component={SellProductScreen} options={{animationEnabled:false}} />
            <Stack.Screen name="RequestProduct" component={RequestProductScreen} options={{animationEnabled:false}} />
            <Stack.Screen name="ManageProduct" component={ManageProductScreen} options={{animationEnabled:false}} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
// registerRootComponent(App);