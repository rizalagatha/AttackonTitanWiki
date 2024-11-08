import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native';

const EpisodeDetailScreen = ({ route }) => {
  const { episode } = route.params; // Menerima data episode dari parameter

  // Fungsi untuk merender karakter yang muncul di episode
  const renderCharacter = ({ item }) => (
    <Text style={styles.characterName}>{item}</Text>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: episode.img }} style={styles.image} />
      <Text style={styles.name}>{episode.name}</Text>
      <Text style={styles.details}>Episode Code: {episode.episode}</Text>

      {/* Daftar karakter yang muncul di episode */}
      <Text style={styles.details}>Characters:</Text>
      <FlatList
        data={episode.characters} // Menggunakan array 'characters' dari episode
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCharacter}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  characterName: {
    fontSize: 14,
    color: '#333',
  },
});

export default EpisodeDetailScreen;
