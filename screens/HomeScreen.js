import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({ navigation }) => {
  // // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const handleLogout = () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  }

  if(!user){
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
            <Button title='Go to Landing' onPress={()=>navigation.navigate('Landing')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to Cart' onPress={()=>navigation.navigate('Cart')} />
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
  }
  
  console.log(user)
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user.email}</Text>
      <Button title='Logout' onPress={handleLogout} />
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

export default HomeScreen;
