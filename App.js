import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import MyComponent from './components/AppBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
    <View className="flex-1 items-center justify-center bg-red">
      <View className="bg-blue-500 text-white font-bold rounded-lg border shadow-lg p-10">
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
        <MyComponent/>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}