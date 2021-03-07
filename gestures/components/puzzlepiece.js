import React, { Component } from "react";
import { Animated,  PanResponder, View,StyleSheet, Text, Image, Dimensions} from "react-native";

export default class Pieces extends Component {
    pan = new Animated.ValueXY();
    secondpan = new Animated.ValueXY();
    thirdpan = new Animated.ValueXY();
    fourthpan = new Animated.ValueXY();
    panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.pan.setOffset({
          x: this.pan.x._value,
          y: this.pan.y._value
        });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.pan.x, dy: this.pan.y }
      ],
      {useNativeDriver: false}),
      onPanResponderRelease: () => {
        this.pan.flattenOffset();
      }
    });

    secondpanResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          this.secondpan.setOffset({
            x: this.secondpan.x._value,
            y: this.secondpan.y._value
          });
        },
        onPanResponderMove: Animated.event([
          null,
          { dx: this.secondpan.x, dy: this.secondpan.y }
        ],
        {useNativeDriver: false}),
        onPanResponderRelease: () => {
          this.secondpan.flattenOffset();
        }
      });

      thirdpanResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          this.thirdpan.setOffset({
            x: this.thirdpan.x._value,
            y: this.thirdpan.y._value
          });
        },
        onPanResponderMove: Animated.event([
          null,
          { dx: this.thirdpan.x, dy: this.thirdpan.y }
        ],
        {useNativeDriver: false}),
        onPanResponderRelease: () => {
          this.thirdpan.flattenOffset();
        }
      });

      fourthpanResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          this.fourthpan.setOffset({
            x: this.fourthpan.x._value,
            y: this.fourthpan.y._value
          });
        },
        onPanResponderMove: Animated.event([
          null,
          { dx: this.fourthpan.x, dy: this.fourthpan.y }
        ],
        {useNativeDriver: false}),
        onPanResponderRelease: () => {
          this.fourthpan.flattenOffset();
        }
      });

    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.titleText}>Move the pieces to create the React Native logo!</Text>
            <View style={styles.rectangle}/>
            <View style={{flexDirection: 'row', flexWrap:'wrap', top:"50%", left:'8%', padding: 15, alignContent:'space-around'}}>
            <Animated.View
              style={{
                transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
              }}
              {...this.panResponder.panHandlers}
            >
              <Image source={require('../assets/row-2-col-1.png')} style={styles.Image}/>
            </Animated.View>
            <Animated.View
              style={{
                transform: [{ translateX: this.secondpan.x }, { translateY: this.secondpan.y }]
              }}
              {...this.secondpanResponder.panHandlers}
            >
              <Image source={require('../assets/row-1-col-1.png')} style={styles.Image}/>
            </Animated.View>
            <Animated.View
              style={{
                transform: [{ translateX: this.thirdpan.x }, { translateY: this.thirdpan.y }]
              }}
              {...this.thirdpanResponder.panHandlers}
            >
              <Image source={require('../assets/row-1-col-2.png')} style={styles.Image}/>
            </Animated.View>
            <Animated.View
              style={{
                transform: [{ translateX: this.fourthpan.x }, { translateY: this.fourthpan.y }]
              }}
              {...this.fourthpanResponder.panHandlers}
            >
              <Image source={require('../assets/row-2-col-2.png')} style={styles.Image}/>
            </Animated.View>
            </View>
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#DDDDDD",
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        },
        titleText: {
          fontSize: 14,
          lineHeight: 24,
          fontWeight: "bold",
          position:'absolute',
          top: '13%',
        left: '10%'
        },
        rectangle: {
            height: 240,
            width: 250,
            backgroundColor: '#FFFFFF',
            borderColor: 'black',
            position: 'absolute',
            top: '23%',
            left: '17%'
          },
      });