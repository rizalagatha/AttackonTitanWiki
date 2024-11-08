import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';  // Pastikan path ini benar

const App = () => {
  return <AppNavigator />; // Gunakan AppNavigator untuk tab navigation utama
};

export default App;
  