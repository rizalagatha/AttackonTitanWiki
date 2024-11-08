import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const TitanScreen = ({ navigation }) => {
  const [titans, setTitans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTitans = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.attackontitanapi.com/titans');
      console.log('Fetched Titans:', response.data);
      setTitans(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching titans:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTitans();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={titans}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('TitanDetail', { titan: item })} // Navigasi ke halaman detail
            >
              <View style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>
                <Image source={{ uri: item.img }} style={styles.image} />
              </View>
            </TouchableOpacity>
          )}
        />
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
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default TitanScreen;
