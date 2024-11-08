import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const CharacterDetailScreen = ({ route }) => {
  const { character } = route.params;

  // Pastikan data karakter ada
  if (!character) {
    return <Text>Loading...</Text>;
  }

  // Menangani array atau properti null/undefined dengan fallback
  const species = character.species && character.species.length > 0 ? character.species.join(', ') : 'No species available';
  const roles = character.roles && character.roles.length > 0 ? character.roles.join(', ') : 'No roles available';
  const episodes = character.episodes && character.episodes.length > 0 ? character.episodes.join(', ') : 'No episodes available';

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{character.name}</Text>

      {character.img && (
        <Image
          source={{ uri: character.img }}
          style={{ width: 200, height: 200, borderRadius: 10, marginVertical: 10 }}
        />
      )}

      <Text style={{ fontSize: 18 }}>Alias: {character.alias && character.alias.length > 0 ? character.alias.join(', ') : 'No alias available'}</Text>
      <Text style={{ fontSize: 18 }}>Species: {species}</Text>
      <Text style={{ fontSize: 18 }}>Gender: {character.gender}</Text>
      <Text style={{ fontSize: 18 }}>Age: {character.age ? character.age : 'Unknown'}</Text>
      <Text style={{ fontSize: 18 }}>Height: {character.height ? character.height : 'Unknown'}</Text>
      <Text style={{ fontSize: 18 }}>Birthplace: {character.birthplace}</Text>
      <Text style={{ fontSize: 18 }}>Residence: {character.residence}</Text>
      <Text style={{ fontSize: 18 }}>Status: {character.status}</Text>
      <Text style={{ fontSize: 18 }}>Occupation: {character.occupation}</Text>
      <Text style={{ fontSize: 18 }}>Roles: {roles}</Text>

      {/* Jika ingin menampilkan data relasi keluarga */}
      <View>
        <Text style={{ fontSize: 18, marginVertical: 10 }}>Relatives:</Text>
        {character.relatives && character.relatives.length > 0 ? (
          character.relatives.map((relative, index) => (
            <Text key={index}>{relative.family ? `${relative.family}: ` : ''}{relative.members.join(', ')}</Text>
          ))
        ) : (
          <Text>No relatives available</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default CharacterDetailScreen;
