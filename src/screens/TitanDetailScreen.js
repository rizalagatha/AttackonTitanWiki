// src/screens/TitanDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const TitanDetailScreen = ({ route }) => {
  const { titan } = route.params; // Menangkap data Titan yang dikirimkan

  return (
    <View style={styles.container}>
      {/* Gambar latar belakang */}
      <Image
        source={{
          uri: 'https://i.pinimg.com/control2/736x/60/b2/c4/60b2c4ac4fd25cc34d2eef5a0708f394.jpg',
        }}
        style={styles.backgroundImage}
      />

      {/* Konten utama */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Menggunakan proxy untuk gambar */}
        <Image
          source={{
            uri: `http://localhost:5000/proxy-image?url=${encodeURIComponent(titan.img)}`, // Proxy digunakan di sini
          }}
          style={styles.image}
        />
        <Text style={styles.name}>{titan.name}</Text>
        <Text style={styles.height}>Height: {titan.height}</Text>
        <Text style={styles.abilities}>
          Abilities: {titan.abilities.join(', ')}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    margin: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  height: {
    fontSize: 18,
    marginTop: 10,
  },
  abilities: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
});

export default TitanDetailScreen;
