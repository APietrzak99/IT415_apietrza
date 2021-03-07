import React, { Component } from "react";
import {View, StyleSheet, Dimensions } from "react-native";
import Pieces from "./components/puzzlepiece"

export default class App extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Pieces/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
});
