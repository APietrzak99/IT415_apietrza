import React from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";

import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { newItem } from './utils/ListUtils';
import EditableFoods from './components/EditableFoods';
import ToggleableListForm from './components/ToggleableListForm';

export default class App extends React.Component {
  state = {
    items: [
      {
        item: 'Milk',
        qty: 2,
        id: uuidv4(),
        isRunning: false,
      },
      {
        item: 'Bananas',
        qty: 1,
        id: uuidv4(),
        isRunning: true,
      },
      {
        item: 'Bread',
        qty: 1,
        id: uuidv4(),
        isRunning: true,
      },
    ],
  };

  handleCreateFormSubmit = item => {
    const { items } = this.state;

    this.setState({
      items: [newItem(item), ...items],
    });
  };

  handleFormSubmit = attrs => {
    const { items } = this.state;

    this.setState({
      items: items.map(item => {
        if (item.id === attrs.id) {
          const{ fooditem, qty } = attrs;

          return {
            ...item,
            fooditem,
            qty,
          };
        }

        return item;
      }),
    });
  };

  handleRemovePress = ItemId => {
    this.setState({
      items: this.state.items.filter(t => t.id !== ItemId),
    });
  };

  togglePurchase = ItemId => {
    this.setState(prevState => {
      const { items } = prevState;

      return {
        items: items.map(item => {
          const { id, isRunning } = item;

          if (id === ItemId) {
            return {
              ...item,
              isRunning: !isRunning,
            };
          }

          return item;
        }),
      };
    });
  };

  render() {
    const { items } = this.state;
    return (
      <ImageBackground source={require('./grocery.jpg')} style={styles.image}>
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        style={styles.ItemListContainer}
      >
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Grocery List</Text>
        </View>
          <ScrollView contentContainerStyle={styles.ItemList}>
            <ToggleableListForm
              onFormSubmit={this.handleCreateFormSubmit}
            />
            {items.map(
              ({ item, qty, id, isRunning }) => (
                <EditableFoods
                  key={id}
                  id={id}
                  item={item}
                  qty={qty.toString()}
                  isRunning={isRunning}
                  onFormSubmit={this.handleFormSubmit}
                  onRemovePress={this.handleRemovePress}
                  onStartPress={this.togglePurchase}
                  onStopPress={this.togglePurchase}
                />
              ),
            )}
          </ScrollView>
      </View>
      </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: "column"
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'white',
  },
  ItemListContainer: {
    flex: 1,
  },
  ItemList: {
    paddingBottom: 15,
  },
});
