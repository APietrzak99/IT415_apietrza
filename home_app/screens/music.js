import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
  
function Favorites({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding:40 }}>
      <Text>This is where the user's favorite songs would be displayed for selection. </Text>
      <Text style={styles.text}>This screen utilizes a tabbed interface and is accessed by a stacked interface.</Text>
      <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

function AllSongs({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding:40 }}>
      <Text>This is where the user's full library would be displayed for selection. </Text>
      <Text style={styles.text}>This screen utilizes a tabbed interface and is accessed by a stacked interface.</Text>
      <Button title="Go Home" onPress={() => navigation.navigate('Home')}/>
    </View>
  );
}

 export function Music() {
  return (
    <Tab.Navigator
      initialRouteName="Music Favorites"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Music Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="playlist-star" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AllSongs"
        component={AllSongs}
        options={{
          tabBarLabel: 'All Music',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="music" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>

  );
}

  const styles = StyleSheet.create({
    text: {
      backgroundColor: "#ecf0f1",
      padding: 25,
      justifyContent: "center"
    },
  });