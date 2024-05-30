import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {app, analytics, auth} from '../firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const DebugScreen = ({navigation}) => {
  // // Set an initializing state whilst Firebase connects
  // const navigation = useNavigation();
  const [initializing, setInitializing] = useState(true);
  const [userAcc, setUserAcc] = useState();

  // // Handle user state changes
  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserAcc(user);
      } else {
        setIsAuthenticated(false);
      }
    });

    return unsubscribe;
    
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('Logout success');
    }).catch((error) => {
      console.log('Logout error', error);
    });
  }

  if(!isAuthenticated){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
          <View style={styles.buttonContainer}>
            <Button title='Go to Login' onPress={()=>navigation.navigate('Login')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to Register' onPress={()=>navigation.navigate('Register')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to Landing' onPress={()=>navigation.navigate('Bottom', { screen: 'Home' })} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to Cart' onPress={()=>navigation.navigate('Bottom', { screen: 'Cart' })} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to SellProduct' onPress={()=>navigation.navigate('SellProduct')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to Request Product' onPress={()=>navigation.navigate('RequestProduct')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to Manage Product' onPress={()=>navigation.navigate('ManageProduct')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to Profile' onPress={()=>navigation.navigate('Bottom', { screen: 'profile' })} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to FCM' onPress={()=>navigation.navigate('FCM')} />
          </View>
      </View>
    );
  }
  
  console.log(userAcc)
  
  return (
    <View style={styles.container}>
      <Button title='Logout' onPress={handleLogout} />
      <Text style={styles.title}>Home Screen</Text>
          <View style={styles.buttonContainer}>
            <Button title='Go to Login' onPress={()=>navigation.navigate('Login')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to Register' onPress={()=>navigation.navigate('Register')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to Landing' onPress={()=>navigation.navigate('Bottom', { screen: 'Home' })} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to Cart' onPress={()=>navigation.navigate('Bottom', { screen: 'Cart' })} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to SellProduct' onPress={()=>navigation.navigate('SellProduct')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to Request Product' onPress={()=>navigation.navigate('RequestProduct')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to Manage Product' onPress={()=>navigation.navigate('ManageProduct')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to Profile' onPress={()=>navigation.navigate('Profile')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to FCM' onPress={()=>navigation.navigate('FCM')} />
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B75BB',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});

export default DebugScreen;