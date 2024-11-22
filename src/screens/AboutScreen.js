// src/screens/AboutScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';

const AboutScreen = () => {
  const openGitHub = () => {
    Linking.openURL('https://github.com/rizalagatha');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tentang Aplikasi</Text>
      <Image
        source={{ uri: 'https://github.com/rizalagatha.png?size=200' }} 
        style={styles.profileImage}
      />
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
      <TouchableOpacity onPress={openGitHub} style={styles.linkContainer}>
        <Text style={styles.linkText}>Kunjungi GitHub Saya</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  linkContainer: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AboutScreen;
