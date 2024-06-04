import React, { useState, useEffect } from 'react';
import { View, Button, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image  } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import { app } from './firebase'
import { useFonts } from 'expo-font';

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
// import FCMScreen from './screens/FCMScreen';
import RequestAdminScreen from './screens/RequestAdminScreen';
import StatusAdminScreen from './screens/StatusAdminScreen';
import StatusProductScreen from './screens/StatusProductScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ModalButtonComponent = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),

  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

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

const useUserData = (auth) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("unauthenticated");
        setLoading(false);
      } else {
        const db = getFirestore(app);
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserData(doc.data());
          });
          setLoading(false);
        } catch (error) {
          console.log('Error getting documents: ', error);
          setLoading(false);
        }
      }
    });
    return unsubscribe;
  }, [auth]);

  return { userData, loading };
};

const BottomNavigation = () => {

  const auth = getAuth();
  const { userData, loading } = useUserData(auth);

  if (loading) {
    return (
      <View className="h-full justify-center items-center ">
              <View>
                  <Text className='text-loaknow-blue text-2xl'>Loading. . . .</Text>
                </View>   
        </View>
    );
  }

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
        component={SellProductScreen}
        options={{
          animationEnabled: false,
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused 
                ? require('./assets/images/loaknow-navbar-focused.png')
                : require('./assets/images/loaknow-navbar.png')
              }
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
      <Tab.Screen name="Transaction" component={TransactionScreen} initialParams={{ userData: userData }} options={{ 
        animationEnabled: false, 
        headerShown: false, 
        tabBarIcon: ({ color, size }) => (
          <Icon source="file-document-outline" color={color} size={size} />
        ), 
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ userData: userData }} options={{ 
        animationEnabled: false, 
        headerShown: false, 
        tabBarIcon: ({ color, size }) => (
          <Icon source="account-outline" color={color} size={size} />
        ), 
      }} />
      
    </Tab.Navigator>
  );
};

const BottomNavigationAdmin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RequestAdmin" component={RequestAdminScreen} options={{ 
        animationEnabled: false, 
        headerShown: false, 
        tabBarIcon: ({ color, size }) => (
          <Icon source="clipboard-list-outline" color={color} size={size} />
        ), 
      }} />
      <Tab.Screen name="StatusAdmin" component={StatusAdminScreen} options={{ 
        animationEnabled: false, 
        headerShown: false, 
        tabBarIcon: ({ color, size }) => (
          <Icon source="clipboard-list-outline" color={color} size={size} />
        ), 
      }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Debug">
        <Stack.Screen name="Debug" component={DebugScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RequestProduct" component={RequestProductScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ManageProduct" component={ManageProductScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Bottom" component={BottomNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="SellProduct" component={SellProductScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Transaction" component={TransactionScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="FCM" component={FCMScreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name="RequestAdmin" component={RequestAdminScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StatusAdmin" component={StatusAdminScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StatusProduct" component={StatusProductScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="BottomAdmin" component={BottomNavigationAdmin} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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