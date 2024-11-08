// src/screens/AboutScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tentang Aplikasi</Text>
      <Text style={styles.text}>
        Aplikasi ini dibuat oleh Rizal Agatha Erdin Agesyah, seorang pengembang perangkat lunak yang 
        tertarik pada dunia anime dan teknologi. Dengan pengalaman dalam pengembangan aplikasi 
        mobile dan web, aplikasi ini dibuat untuk memudahkan penggemar *Attack on Titan* dalam 
        menjelajahi informasi tentang karakter, titan, dan episode dalam anime ini.
      </Text>
      <Text style={styles.text}>
        Jika Anda memiliki pertanyaan atau saran, Anda dapat menghubungi saya melalui email di: 
        rizalagatha1403@gmail.com
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});

export default AboutScreen;
