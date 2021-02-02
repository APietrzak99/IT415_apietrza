import React from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  Text,
  AsyncStorage,
  Modal,
  propTypes
} from 'react-native';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import EditableFoods from './components/EditableFoods';
import ToggleableListForm from './components/ToggleableListForm';
import { newItem } from './utils/ListUtils';
import Notes from './screens/Notes.js'

// const ASYNC_STORAGE_NOTES_KEY = 'ASYNC_STORAGE_NOTES_KEY';
// const ASYNC_STORAGE_QTY_KEY = 'ASYNC_STORAGE_QTY_KEY';
// const ASYNC_STORAGE_FOOD_KEY = 'ASYNC_STORAGE_FOOD_KEY';
const ASYNC_STORAGE_ITEMS_KEY = 'ASYNC_STORAGE_ITEMS_KEY';

export default class App extends React.Component {
  state = {
    items: [
    ],
    showModal: false,
    // notes: {},
  };


  //before first run, comment this out, then run. add an item, then uncomment it to have async.
  async componentDidMount() {
    try {
      const items = await AsyncStorage.getItem(
        ASYNC_STORAGE_ITEMS_KEY,
        );
    // const notes= await AsyncStorage.getItem(
    // ASYNC_STORAGE_NOTES_KEY,
    // );
    // const qty = await AsyncStorage.getItem(
    // ASYNC_STORAGE_QTY_KEY,
    // );
    // const item = await AsyncStorage.getItem(
    // ASYNC_STORAGE_FOOD_KEY,
    // )
      this.setState({
      items: items
      ? JSON.parse(items)
      : {},
    // notes: notes
    // ? JSON.parse(notes)
    // : {},
    // qty: qty
    // ? JSON.parse(qty)
    // : {},
    // item: item
    // ? JSON.parse(item)
    // : {},
    });
    
    } catch (e) {
      console.log('Failed to load foods', e);
}
}

  openNotesScreen = (id) => {
    this.setState({
    showModal: true,
    selectedItemId: id,
    });
  };

  closeNotesScreen = () => {
    this.setState({
    showModal: false,
    selectedItemId: null,
  });
  };

  handleCreateFormSubmit = async item => {
    const { items } = this.state;

    this.setState({
      items: [newItem(item), ...items],
    });

    try {
      await AsyncStorage.setItem(
      ASYNC_STORAGE_ITEMS_KEY,
      JSON.stringify([newItem(item), ...items]),
      );
      } catch (e) {
      console.log(e);
      }
  };

// here's a copy of the try catch statement i used. If i place it in handleformsubmit, it doesn't save.
  // try {
  //   await AsyncStorage.setItem(
  //   ASYNC_STORAGE_NOTES_KEY,
  //   JSON.stringify(notes),
  //   );
  //   } catch (e) {
  //   console.log(
  //   'Failed to save notes',
  //   );
  //   }
    

  handleFormSubmit = async attrs => {
    const { items } = this.state;

    this.setState({
      items: items.map(item => {
        if (item.id === attrs.id) {
          const{ fooditem, qty,notes } = attrs;
          return {
            ...item,
            fooditem,
            qty,
            notes,
          };
        }
        return item;
      }),
    });
    try {
      await AsyncStorage.setItem(
      ASYNC_STORAGE_ITEMS_KEY,
      JSON.stringify([newItem(attrs), ...items]),
      );
      } catch (e) {
      console.log(e);
      }
  };


  handleRemovePress = async ItemId => {
    const { items } = this.state;
    this.setState({
      items: this.state.items.filter(t => t.id !== ItemId),
    });
    // try {
    //   await AsyncStorage.removeItem(
    //   ASYNC_STORAGE_ITEMS_KEY,
    //   JSON.stringify([newItem(ItemId), ...items]),
    //   );
    //   } catch (e) {
    //   console.log(e);
    //   }
  }
  
  togglePurchase = ItemId => {
    this.setState(prevState => {
      const { items } = prevState;

      return {
        items: items.map(item => {
          const { id, isPurchased } = item;

          if (id === ItemId) {
            return {
              ...item,
              isPurchased: !isPurchased,
            };
          }

          return item;
        }),
      };
    });
  };
    

  render() {
    const { items, notes, showModal } = this.state;
    return (
      <ImageBackground source={require('./assets/grocery.jpg')} style={styles.image}>
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
              ({ item, qty, id, notes, isPurchased }) => (
                <EditableFoods
                  key={id}
                  id={id}
                  item={item}
                  notes={notes}
                  qty={qty.toString()}
                  isPurchased={isPurchased}
                  onFormSubmit={this.handleFormSubmit}
                  onRemovePress={this.handleRemovePress}
                  onStartPress={this.togglePurchase}
                  onStopPress={this.togglePurchase}
                  onNotesPress={this.openNotesScreen}
                />
              ),
            )}
          </ScrollView>
          <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={this.closeNotesScreen}
        >
          <Notes
            notes={notes}
            onClose={this.closeNotesScreen}
          />
        </Modal>
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
