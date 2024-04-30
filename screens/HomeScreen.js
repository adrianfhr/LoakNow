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

  const goToLogin = () => {
    navigation.navigate('Login'); // Navigasi ke halaman Login
  };

  const goToRegister = () => {
    navigation.navigate('Register'); // Navigasi ke halaman Register
  };
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
            <Button title='Go to Login' onPress={goToLogin} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Go to Register' onPress={goToRegister} />
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
