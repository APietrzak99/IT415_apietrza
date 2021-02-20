import { StyleSheet, View, Text, Image, TouchableNativeFeedback} from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ListButton from './ListButton';
import products from './imagesetup'

export default class Item extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    qty: PropTypes.string.isRequired,
    picture: PropTypes.number,
    isPurchased: PropTypes.bool.isRequired,
    onEditPress: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    onStartPress: PropTypes.func.isRequired,
    onStopPress: PropTypes.func.isRequired,
  };

  handleStartPress = () => {
    const { id, onStartPress } = this.props;

    onStartPress(id);
  };

  handleStopPress = () => {
    const { id, onStopPress } = this.props;

    onStopPress(id);
  };

  handleRemovePress = () => {
    const { id, onRemovePress } = this.props;

    onRemovePress(id);
  };

  renderActionButton() {
    const { isPurchased } = this.props;

    if (isPurchased) {
      return (
        <ListButton
          color="#DB2828"
          item ="Remove Purchase"
          onPress={this.handleStopPress}
        />
      );
    }

    return (
      <ListButton
        color="#21BA45"
        item="Purchase"
        onPress={this.handleStartPress}
      />
    );
  }  
// I couldn't figure out how to send the correct data from imagesetup.js to here so it could display the images for each product correctly. I tried to pass data from App.js 
// so I could use that as a means of identifying which image to use in each container, but that never ended up panning out.  I've left it as placeholder because I at least can turn
// in a mostly functional app, minus the pictures. Some of my experiments to get this working led to a severely broken app, so at the very least the app works now.
  render() {
    const { item, qty, picture, onEditPress } = this.props;
    return (
      <View style={styles.ItemContainer}>
        <Text>Qty: {qty}</Text>
        <Text style={styles.item}>{item}</Text>
        <Image style = {styles.images} source={picture} />
        <View style={styles.buttonGroup}>
          <ListButton
            color="blue"
            small
            item="Edit"
            onPress={onEditPress}
          />
          <ListButton
            color="blue"
            small
            item="Remove"
            onPress={this.handleRemovePress}
          />
        </View>
        {this.renderActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ItemContainer: {
    backgroundColor: 'white',
    borderColor: '#d6d7da',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  item: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ListItem: {
    textAlign: 'center',
    paddingVertical: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  images: {
    height: 100,
    width: 100, 
    justifyContent: 'center',
    alignSelf:'center',
  }
});
