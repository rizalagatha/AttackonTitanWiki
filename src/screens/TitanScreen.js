import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';

const TitanScreen = ({ navigation }) => {
  const [titans, setTitans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTitans = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.attackontitanapi.com/titans');
      setTitans(response.data.results);
    } catch (error) {
      console.error('Error fetching titans:', error);
      setError('Failed to load titans. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTitans();
  }, []);

  const renderTitanItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TitanDetail', { titan: item })}>
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        {item.img ? (
          <Image
            source={{ uri: `http://localhost:5000/proxy-image?url=${encodeURIComponent(item.img)}` }} // Menggunakan proxy server untuk gambar
            style={styles.image}
          />
        ) : (
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder jika gambar tidak ada
            style={styles.image}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/control2/736x/60/b2/c4/60b2c4ac4fd25cc34d2eef5a0708f394.jpg' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={titans}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTitanItem}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TitanScreen;
