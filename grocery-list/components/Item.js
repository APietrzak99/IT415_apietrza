import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ListButton from './ListButton';

export default class Item extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    qty: PropTypes.string.isRequired,
    isRunning: PropTypes.bool.isRequired,
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
    const { isRunning } = this.props;

    if (isRunning) {
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

  render() {
    const { item, qty, onEditPress } = this.props;

    return (
      <View style={styles.ItemContainer}>
        <Text>Qty: {qty.toString()}</Text>
        <Text style={styles.ListItem}>{item}</Text>
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  ListItem: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
