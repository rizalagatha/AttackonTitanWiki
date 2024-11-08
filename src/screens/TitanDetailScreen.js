// src/screens/TitanDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TitanDetailScreen = ({ route }) => {
  const { titan } = route.params; // Menangkap data Titan yang dikirimkan

  return (
    <View style={styles.container}>
      <Image source={{ uri: titan.img }} style={styles.image} />
      <Text style={styles.name}>{titan.name}</Text>
      <Text style={styles.height}>Height: {titan.height}</Text>
      <Text style={styles.abilities}>Abilities: {titan.abilities.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
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
