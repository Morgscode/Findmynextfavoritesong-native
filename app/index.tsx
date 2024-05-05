import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  const isLoggedIn = false;
  const token = null;
 
  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="text-gray-200">Hello World!</Text>
      <StatusBar />
    </View>
  );
}
