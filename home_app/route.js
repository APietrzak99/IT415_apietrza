import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {Home, Feeds} from './screens/camerafeeds';
import {Music_Screen} from './screens/music';


const Stack = createStackNavigator();

export default function MyTabs() {
    return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Feeds" component={Feeds} />
        <Stack.Screen name="Music_Screen" component={Music_Screen} />
      </Stack.Navigator>
    );
  }