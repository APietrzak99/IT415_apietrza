import React, { Component } from 'react';
import { Image, Animated, Text, View, StyleSheet, ImageBackground, Dimensions,Button } from 'react-native';

export default class AnimationApp extends Component {

  state = {
    fadeAnim: new Animated.Value(0)
  };

  fadeIn = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false<Button title="Wiggle" onPress={this.fadeOut} />
    }).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: false
    }).start();
  };
  

  render() {
    return (
          <View style={styles.container}>
        <ImageBackground source={require('./assets/spiderman_scene.png')} style={styles.backgroundImage}>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: this.state.fadeAnim
            }
          ]}
        >
          <Image source={require('./assets/spiderman.png')} style={styles.SpidermanImage}/>
        </Animated.View>
        <Image source={require('./assets/spiderman_mask.png')} style={styles.Image}/>
        <View style={styles.buttonRow}>
        <Button title="Fade In" onPress={this.fadeIn} />
          <Button title="Fade Out" onPress={this.fadeOut} />
          <Button title="Wiggle" onPress={this.fadeIn} />
          <Button title="     ?     " onPress={this.fadeOut} />
          </View>
        </ImageBackground>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    
  },
  Image:{
    top:200,
    left: 165
  },
  SpidermanImage:{
    top:50,
    width: 400,
    height: 250
  },
  buttonRow: {
    top:250,
    flexDirection: "row",
    marginVertical: 16,
    padding:20,
    justifyContent:'space-between'
  }

});
