import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selamat datang di Aplikasi Attack on Titan!</Text>
      <Text style={styles.description}>
        Aplikasi ini memungkinkan Anda untuk menjelajahi dan menikmati konten dari dunia *Attack on Titan*. Dapatkan informasi mendalam mengenai karakter, titan, dan episode dari anime ini, serta banyak lagi saat Anda menjelajahi aplikasi!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HomeScreen;
