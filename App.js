import React, { useState } from 'react';
import { View, Button, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image  } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DebugScreen from './screens/DebugScreen';
import CartScreen from './screens/CartScreen';
import SellProductScreen from './screens/SellProductScreen';
import RequestProductScreen from './screens/RequestProductScreen';
import ManageProductScreen from './screens/ManageProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import TransactionScreen from './screens/TransactionScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ModalButtonComponent = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal} >
        <Image source={require('./assets/images/loaknow-navbar.png')} style={{width:30, height:30}}/>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => handleModalClose()}

      >
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View  className="flex-1 items-center justify-between flex-row px-10 " style={styles.modalContainer}>
              <TouchableOpacity onPress={()=>{navigation.navigate("SellProduct")}}>
                <View className="rounded-[50px] w-40 h-40 flex shadow-2xl items-center justify-center bg-loaknow-yellow">
                  <Image className="" source={require('./assets/images/cart-product.png')} style={{width:80, height:80}}/>
                  <Text className="text-base font-semibold">Sell Product</Text>
                </View>
              </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>{navigation.navigate("ManageProduct")}}>
                <View className=" bg-loaknow-yellow rounded-[50px] w-40 h-40 flex items-center justify-center">
                <Image className="" source={require('./assets/images/manage-product.png')} style={{width:80, height:80}}/>
                <Text className="text-base font-semibold">Manage Product</Text>
              </View> 
            </TouchableOpacity>
        
            </View>
        </TouchableWithoutFeedback>
        
      </Modal>
    </>
  );
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ 
        animationEnabled: false, 
        headerShown: false, 
        tabBarIcon: ({ color, size }) => (
          <Icon source="home-outline" color={color} size={size} />
        ), 
      }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ 
        animationEnabled: false, 
        headerShown: false, 
        tabBarIcon: ({ color, size }) => (
          <Icon source="cart-outline" color={color} size={size} />
        ), 
      }} />
      <Tab.Screen 
        name="Loak Now" 
        component={View} 
        options={{ 
          // tabBarIcon: ({ color, size }) => (
          //   <Icon source="account-outline" color={color} size={size} />
          // ), 
          tabBarIcon: (props) => (
            <ModalButtonComponent {...props} />
          ),
        }} 
      />
      <Tab.Screen name="Transaction" component={TransactionScreen} options={{ 
        animationEnabled: false, 
        headerShown: false, 
        tabBarIcon: ({ color, size }) => (
          <Icon source="file-document-outline" color={color} size={size} />
        ), 
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ 
        animationEnabled: false, 
        headerShown: false, 
        tabBarIcon: ({ color, size }) => (
          <Icon source="account-outline" color={color} size={size} />
        ), 
      }} />
      
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Debug">
        <Stack.Screen name="Debug" component={DebugScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SellProduct" component={SellProductScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RequestProduct" component={RequestProductScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ManageProduct" component={ManageProductScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Bottom" component={BottomNavigation} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomNavBar: {
    height: 90,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  modalContainer: {

    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  positionBar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },  
});

export default App;

// registerRootComponent(App);

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