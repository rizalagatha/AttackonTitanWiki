import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const HomeScreen = () => {
  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/control2/736x/1d/3e/23/1d3e235581c04d751667f24f57320d1d.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Selamat datang di Aplikasi Attack on Titan!</Text>
        <Text style={styles.description}>
          Aplikasi ini bikin kamu bisa eksplorasi dunia Attack on Titan dengan gampang! Dapetin info seru seputar karakter, titan, episode, dan banyak lagi pas kamu ngulik aplikasi ini!
        </Text>
        <Text style={styles.description}>
          Attack on Titan atau Shingeki no Kyojin adalah anime yang bercerita tentang Eren Jaeger dan teman-temannya yang terkurung di balik tembok raksasa. Selama lebih dari seratus tahun, manusia hidup damai di dalam tembok yang terdiri tiga tembok besar, yaitu Tembok Maria, Rose, dan Sheena.
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center', // Tambahkan properti ini
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
});

export default HomeScreen;
