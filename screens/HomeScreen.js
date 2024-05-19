import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const HomeScreen = ({ navigation }) => {

  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
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
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      {isAuthenticated ? (
        <View style={styles.buttonContainer}>
          <Button title='Logout' onPress={handleLogout} />
        </View>
      ) : (
        <>
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
        </>
      )}
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
