import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Button, TextInput, ImageBackground } from 'react-native';

const CharacterScreen = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCharacters = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url || 'https://api.attackontitanapi.com/characters');
      const data = await response.json();
  
      if (data && data.results) {
        const charactersWithImages = await Promise.all(data.results.map(async (character) => {
          let imageUrl = character.img;
  
          // Cek apakah img ada, jika tidak gunakan gambar default
          if (!imageUrl) {
            imageUrl = 'https://example.com/default-image.png';
          }
  
          // Coba untuk fetch gambar dengan 'no-cors'
          if (imageUrl.startsWith('https://static.wikia.nocookie.net')) {
            const imageResponse = await fetch(imageUrl, { mode: 'no-cors' });
            imageUrl = imageResponse.url; // Dapatkan URL gambar yang sudah diterima
          }
  
          return {
            ...character,
            imageUrl,
          };
        }));
  
        setCharacters(charactersWithImages);
        setFilteredCharacters(charactersWithImages);
        setNextPage(data.info?.next_page);
        setPrevPage(data.info?.prev_page);
        setLoading(false);
      } else {
        console.error('No characters found in response:', data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = characters.filter((character) =>
        character.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCharacters(filtered);
    } else {
      setFilteredCharacters(characters);
    }
  };

  const renderCharacter = ({ item }) => {
    const imageUrl = `http://localhost:5000/proxy-image?url=${encodeURIComponent(item.img)}`;
  
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CharacterDetail', { character: item })}
      >
        <View style={styles.card}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  


  

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/control2/736x/7b/b7/d9/7bb7d9c0575070011161176e2a714521.jpg' }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Characters..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <FlatList
              data={filteredCharacters}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderCharacter}
            />
            <View style={styles.pagination}>
              <Button
                title="Previous"
                onPress={() => prevPage && fetchCharacters(prevPage)}
                disabled={!prevPage}
              />
              <Text style={styles.pageInfo}>
                {nextPage ? 'More characters available' : 'End of list'}
              </Text>
              <Button
                title="Next"
                onPress={() => nextPage && fetchCharacters(nextPage)}
                disabled={!nextPage}
              />
            </View>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Mengatur gambar latar belakang agar menutupi seluruh layar
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Tambahkan overlay semi-transparan untuk kontras teks
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff', // Latar belakang putih untuk input
  },
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
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CharacterScreen;
