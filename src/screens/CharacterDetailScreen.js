import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const CharacterDetailScreen = ({ route }) => {
  const { character } = route.params;
  const [relativesData, setRelativesData] = useState([]);

  useEffect(() => {
    const fetchRelatives = async () => {
      if (character.relatives?.length > 0) {
        const relativesWithNames = await Promise.all(
          character.relatives.map(async (relative) => {
            const members = await Promise.all(
              relative.members.map(async (member) => {
                if (member.startsWith('http')) {
                  try {
                    const response = await fetch(member);
                    const data = await response.json();
                    return data.name || member;
                  } catch (error) {
                    console.error('Failed to fetch member:', member, error);
                    return member;
                  }
                }
                return member;
              })
            );
            return { family: relative.family, members };
          })
        );
        setRelativesData(relativesWithNames);
      }
    };

    fetchRelatives();
  }, [character]);

  const renderRelatives = () => {
    if (relativesData.length > 0) {
      return relativesData.map((relative, index) => (
        <View key={index} style={styles.relativeItem}>
          {relative.family && <Text style={styles.relativeFamily}>{relative.family}</Text>}
          {relative.members?.length > 0 ? (
            <Text style={styles.relativeMembers}>Members: {relative.members.join(', ')}</Text>
          ) : (
            <Text style={styles.noData}>No members listed</Text>
          )}
        </View>
      ));
    }
    return <Text style={styles.noData}>No relatives available</Text>;
  };

  // Gunakan proxy jika perlu
  const proxyUrl = 'http://localhost:5000/proxy-image?url=';
  const imageUrl = character.img ? proxyUrl + encodeURIComponent(character.img) : null;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pinimg.com/control2/736x/7b/b7/d9/7bb7d9c0575070011161176e2a714521.jpg' }}
        style={styles.backgroundImage}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{character.name}</Text>

        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Image source={{ uri: 'https://example.com/placeholder-image.jpg' }} style={styles.image} />
        )}

        <Text style={styles.detailText}>Alias: {character.alias?.length > 0 ? character.alias.join(', ') : 'No alias available'}</Text>
        <Text style={styles.detailText}>Species: {character.species?.length > 0 ? character.species.join(', ') : 'No species available'}</Text>
        <Text style={styles.detailText}>Gender: {character.gender || 'Unknown'}</Text>
        <Text style={styles.detailText}>Age: {character.age || 'Unknown'}</Text>
        <Text style={styles.detailText}>Height: {character.height || 'Unknown'}</Text>
        <Text style={styles.detailText}>Birthplace: {character.birthplace || 'Unknown'}</Text>
        <Text style={styles.detailText}>Residence: {character.residence || 'Unknown'}</Text>
        <Text style={styles.detailText}>Status: {character.status || 'Unknown'}</Text>
        <Text style={styles.detailText}>Occupation: {character.occupation || 'Unknown'}</Text>
        <Text style={styles.detailText}>Roles: {character.roles?.length > 0 ? character.roles.join(', ') : 'No roles available'}</Text>

        <View style={styles.relativesSection}>
          <Text style={styles.sectionTitle}>Relatives:</Text>
          {renderRelatives()}
        </View>
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
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 5,
  },
  relativesSection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  relativeItem: {
    marginBottom: 10,
  },
  relativeFamily: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  relativeMembers: {
    fontSize: 16,
    marginLeft: 10,
  },
  noData: {
    fontSize: 16,
    color: '#888',
  },
});

export default CharacterDetailScreen;
