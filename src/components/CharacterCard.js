import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CharacterCard = ({ name, image, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.name}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CharacterCard;
