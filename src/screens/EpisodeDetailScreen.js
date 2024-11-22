import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';

const EpisodeDetailScreen = ({ route }) => {
  const { episode } = route.params; // Menerima data episode dari parameter
  const [characterNames, setCharacterNames] = useState([]); // Menyimpan nama karakter
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil nama karakter dari URL API
  const fetchCharacterNames = async () => {
    try {
      const names = await Promise.all(
        episode.characters.map(async (url) => {
          const response = await fetch(url);
          const data = await response.json();
          return data.name; // Pastikan API mengembalikan properti 'name'
        })
      );
      setCharacterNames(names); // Set nama karakter yang berhasil diambil
    } catch (error) {
      console.error('Error fetching character names:', error);
      setCharacterNames(['Failed to load characters']); // Jika gagal, tampilkan pesan error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacterNames(); // Fetch nama karakter ketika komponen dimount
  }, []);

  // Fungsi untuk merender nama karakter
  const renderCharacter = ({ item }) => (
    <Text style={styles.characterName}>{item}</Text>
  );

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={{ uri: 'https://i.pinimg.com/736x/64/7e/e9/647ee93bb4d814d34e2141975ae5f68b.jpg' }}
        style={styles.backgroundImage}
      />
      {/* Konten Utama */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Gambar Episode */}
        <Image
          source={{
            uri: `http://localhost:5000/proxy-image?url=${encodeURIComponent(episode.img)}`, // Gunakan proxy untuk gambar
          }}
          style={styles.image}
        />
        <Text style={styles.name}>{episode.name}</Text>
        <Text style={styles.details}>Episode Code: {episode.episode}</Text>

        {/* Daftar karakter yang muncul di episode */}
        <Text style={styles.details}>Characters:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={characterNames} // Gunakan nama karakter yang sudah difetch
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCharacter}
          />
        )}
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
    ...StyleSheet.absoluteFillObject, // Background image memenuhi layar
    width: '100%',
    height: '100%',
    opacity: 0.3, // Transparansi background
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Lapisan transparansi di atas background
    borderRadius: 8,
    margin: 16,
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
