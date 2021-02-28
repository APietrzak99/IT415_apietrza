import React, { Component } from 'react';
import { Image, Animated, View, StyleSheet, ImageBackground, Dimensions, Button} from 'react-native';

export default class AnimationApp extends Component {

  state = {
    fadeAnim: new Animated.Value(0),
    spinAnim: new Animated.Value(0),
    shakeAnimation: new Animated.Value(0)
  };

  startShake = () => {
    Animated.sequence([
      Animated.timing(this.state.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(this.state.shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(this.state.shakeAnimation,{ toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(this.state.shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
    ]).start();
 }

  fadeIn = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false
    }).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: false
    }).start();
  };
  
  spinning = () => {
    this.state.spinAnim.setValue(0);
    Animated.timing(this.state.spinAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false
    }).start();
  };

  render() {
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    const shake = this.state.shakeAnimation.interpolate({
      inputRange: [-1, 1],
      outputRange: [-0.5,0.5]
    })
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
        <Animated.View style={{ transform: [{translateX: shake}] }}>  
        <Animated.View style={{transform: [{rotate: spin}] }} >
        <Image source={require('./assets/spiderman_mask.png')} style={styles.Image}/>
        </Animated.View>
        </Animated.View>
        <View style={styles.buttonRow}>
        <Button title="Fade In" onPress={this.fadeIn} />
          <Button title="Fade Out" onPress={this.fadeOut} />
          <Button title="Wiggle" onPress={this.startShake} />
          <Button title="    ?     " onPress={this.spinning} />
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
