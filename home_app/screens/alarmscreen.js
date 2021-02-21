import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from './camerafeeds';

const Drawer = createDrawerNavigator();
  
function ActiveAlarms() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding:40 }}>
      <Text>This is where the user's active alarms would be displayed for selection or editing. </Text>
      <Text style={styles.text}>This screen utilizes a drawer interface and is accessed by a stacked interface.</Text>
      <Text style={styles.text}>⬅️ Slide from left to right to see other alarms</Text>
    </View>
  );
}

function InactiveAlarms() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding:40 }}>
      <Text>This is where the user's inactive alarms would be displayed for selection or editing. </Text>
      <Text style={styles.text}>This screen utilizes a drawer interface and is accessed by a stacked interface.</Text>
      <Text style={styles.text}>⬅️ Slide from left to right to see other alarms</Text>
    </View>
  );
}

 export function Alarms() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ActiveAlarms" component={ActiveAlarms} />
      <Drawer.Screen name="InactiveAlarms" component={InactiveAlarms} />
    </Drawer.Navigator>

  );
}

  const styles = StyleSheet.create({
    text: {
      backgroundColor: "#ecf0f1",
      padding: 25,
      justifyContent: "center"
    },
  });