import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

  export function Home({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>This contains the basic Security dashboard information.</Text>
        <Text style={styles.text}>This includes the basic system health and menus to get to other parts of the app.</Text>
      <Button
      style={{padding:10}}
      color="black"
        title="Access Cameras  📹"
        onPress={() => navigation.navigate('Feeds')}
      />
      <Text></Text>
      <Text></Text>
      <Button
        style={{padding:10}}
        color="black"
        title="Access Music Player 🎶"
        onPress={() => navigation.navigate('Music')}
      />
      <Text></Text>
      <Text></Text>
      <Button
        style={{padding:10}}
        color="black"
        title="View Alarms 🔒"
        onPress={() => navigation.navigate('Alarms')}
      />
      <Text></Text>
      <Text></Text>
      <Button
        style={{padding:10}}
        color="black"
        title="View Camera Settings ⚙️"
        onPress={() => navigation.navigate('Settings')}
      />
      </View>
    );
  }
  
  export function Feeds({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>This is where the user would access their camera feeds. </Text>
        <Text style={styles.text}>The feeds would be presented in a grid style menu where you could scroll down. </Text>
        <Text style={styles.text}>Accessing this screen means a stacked interface has been utilized. </Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    text: {
      backgroundColor: "#ecf0f1",
      padding: 25,
      justifyContent: "center"
    },
  });
