import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
  
  export function Settings({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.text}>This is where the user would access their camera feed settings. </Text>
        <Text style={styles.text}>This screen would display a list with each connected display and allow you to click each one for editing. </Text>
        <Button title="Settings Screen" onPress={() => navigation.navigate("Editing")} />
        <Text></Text>
      <Text></Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  export function Editing({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.text}>This is where the user would be editing an individual camera feed's settings. </Text>
        <Text style={styles.text}>The settings incude picture quality, the name, location, etc. </Text>
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
