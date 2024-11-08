import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Button } from 'react-native';

const EpisodeScreen = ({ navigation }) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);  // URL untuk halaman berikutnya
  const [prevPage, setPrevPage] = useState(null);  // URL untuk halaman sebelumnya

  // Function untuk mengambil data episode
  const fetchEpisodes = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url || 'https://api.attackontitanapi.com/episodes'); // Gunakan URL yang sudah ada atau URL default
      const data = await response.json();
      console.log('Fetched Episodes:', data);
      setEpisodes(data.results); // Menggunakan 'results' untuk data episode
      setNextPage(data.info.next_page); // Set URL untuk halaman berikutnya
      setPrevPage(data.info.prev_page); // Set URL untuk halaman sebelumnya
      setLoading(false);
    } catch (error) {
      console.error('Error fetching episodes:', error);
      setLoading(false);
    }
  };

  // Mengambil data saat pertama kali render
  useEffect(() => {
    fetchEpisodes();  // Panggil API pertama kali
  }, []);

  const renderEpisode = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('EpisodeDetail', { episode: item })} // Navigasi ke halaman detail episode
    >
      <View style={styles.card}>
        <Image
          source={{ uri: item.img }}  // Menampilkan gambar episode/poster
          style={styles.image}
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            data={episodes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderEpisode}
          />
          {/* Pagination Controls */}
          <View style={styles.pagination}>
            <Button
              title="Previous"
              onPress={() => prevPage && fetchEpisodes(prevPage)} // Navigasi ke halaman sebelumnya
              disabled={!prevPage} // Disable tombol Previous jika tidak ada halaman sebelumnya
            />
            <Text style={styles.pageInfo}>
              {/* Tampilkan informasi halaman */}
              {nextPage ? 'More episodes available' : 'End of list'}
            </Text>
            <Button
              title="Next"
              onPress={() => nextPage && fetchEpisodes(nextPage)} // Navigasi ke halaman berikutnya
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

export default EpisodeScreen;
