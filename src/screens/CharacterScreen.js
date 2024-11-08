import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Button, TextInput } from 'react-native';

const CharacterScreen = ({ navigation }) => {
  const [characters, setCharacters] = useState([]); // Semua karakter yang diambil
  const [filteredCharacters, setFilteredCharacters] = useState([]); // Karakter yang difilter
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);  // URL untuk halaman berikutnya
  const [prevPage, setPrevPage] = useState(null);  // URL untuk halaman sebelumnya
  const [searchQuery, setSearchQuery] = useState(''); // Query pencarian

  // Function untuk mengambil karakter dari API
  const fetchCharacters = async (url) => {
    setLoading(true);

    // Reset characters sebelum mengambil data halaman berikutnya
    setCharacters([]);
    setFilteredCharacters([]);

    try {
      const response = await fetch(url || 'https://api.attackontitanapi.com/characters'); // Gunakan URL yang sudah ada atau URL default
      const data = await response.json();
      console.log('Fetched Characters:', data);

      // Gabungkan hasil karakter yang ada
      setCharacters(data.results); 
      setFilteredCharacters(data.results); // Set filtered characters sama dengan data hasil fetch

      // Set URL untuk halaman berikutnya dan sebelumnya
      setNextPage(data.info.next_page);
      setPrevPage(data.info.prev_page);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setLoading(false);
    }
  };

  // Mengambil data saat pertama kali render
  useEffect(() => {
    fetchCharacters();  // Panggil API pertama kali
  }, []);

  // Fungsi untuk memfilter karakter berdasarkan pencarian
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      // Filter karakter yang nama-nya mengandung query
      const filtered = characters.filter((character) =>
        character.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCharacters(filtered);
    } else {
      // Jika pencarian kosong, tampilkan semua karakter
      setFilteredCharacters(characters);
    }
  };

  const renderCharacter = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CharacterDetail', { character: item })} // Navigasi ke halaman detail karakter
    >
      <View style={styles.card}>
        <Image
          source={{ uri: item.img }}  // Menampilkan gambar karakter
          style={styles.image}
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Input pencarian */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Characters..."
        value={searchQuery}
        onChangeText={handleSearch} // Update query saat input berubah
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            data={filteredCharacters}  // Menampilkan karakter yang sudah difilter
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCharacter}
          />
          {/* Pagination Controls */}
          <View style={styles.pagination}>
            <Button
              title="Previous"
              onPress={() => prevPage && fetchCharacters(prevPage)} // Navigasi ke halaman sebelumnya
              disabled={!prevPage} // Disable tombol Previous jika tidak ada halaman sebelumnya
            />
            <Text style={styles.pageInfo}>
              {/* Tampilkan informasi halaman */}
              {nextPage ? 'More characters available' : 'End of list'}
            </Text>
            <Button
              title="Next"
              onPress={() => nextPage && fetchCharacters(nextPage)} // Navigasi ke halaman berikutnya
              disabled={!nextPage} // Disable tombol Next jika tidak ada halaman berikutnya
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  card: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 100,   // Adjust width and height as needed
    height: 100,  // Adjust width and height as needed
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
  },
});

export default CharacterScreen;
