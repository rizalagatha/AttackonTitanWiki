import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Button, ImageBackground } from 'react-native';

const EpisodeScreen = ({ navigation }) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null); // URL untuk halaman berikutnya
  const [prevPage, setPrevPage] = useState(null); // URL untuk halaman sebelumnya

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
    fetchEpisodes(); // Panggil API pertama kali
  }, []);

  const renderEpisode = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('EpisodeDetail', { episode: item })} // Navigasi ke halaman detail episode
    >
      <View style={styles.card}>
        {/* Menggunakan proxy untuk gambar */}
        <Image
          source={{
            uri: `http://localhost:5000/proxy-image?url=${encodeURIComponent(item.img)}`, // Gunakan proxy untuk gambar
          }}
          style={styles.image}
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/64/7e/e9/647ee93bb4d814d34e2141975ae5f68b.jpg' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Mengatur agar gambar menutupi seluruh layar
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay semi-transparan agar konten lebih jelas
    padding: 16,
  },
  card: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Latar belakang transparan untuk kartu
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 100, // Sesuaikan lebar dan tinggi gambar sesuai kebutuhan
    height: 100, // Sesuaikan lebar dan tinggi gambar sesuai kebutuhan
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Warna teks untuk kontras dengan latar belakang
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
    color: '#fff', // Warna teks untuk kontras dengan latar belakang
  },
});

export default EpisodeScreen;
