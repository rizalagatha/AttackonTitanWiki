import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';  // Import Stack Navigator
import { MaterialIcons } from 'react-native-vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CharacterScreen from '../screens/CharacterScreen';
import TitanScreen from '../screens/TitanScreen';
import EpisodeScreen from '../screens/EpisodeScreen';
import AboutScreen from '../screens/AboutScreen';
import TitanDetailScreen from '../screens/TitanDetailScreen';  // Import TitanDetailScreen
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import EpisodeDetailScreen from '../screens/EpisodeDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Create Stack Navigator

// Stack Navigator untuk TitanDetailScreen
const TitanStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Titans" component={TitanScreen} />
    <Stack.Screen name="TitanDetail" component={TitanDetailScreen} />
  </Stack.Navigator>
);
// Stack Navigator for CharacterScreen and CharacterDetailScreen
const CharacterStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Characters" component={CharacterScreen} />
    <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
  </Stack.Navigator>
);

// Stack Navigator for EpisodeScreen and EpisodeDetailScreen
const EpisodeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Episodes" component={EpisodeScreen} />
    <Stack.Screen name="EpisodeDetail" component={EpisodeDetailScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Hide header on tab bar screens
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Character"
          component={CharacterStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="people" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Titans"
          component={TitanStack}  // Use TitanStack sebagai screen untuk Titans
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="face" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Episodes"
          component={EpisodeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="tv" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="question-mark" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
