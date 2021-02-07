import { StyleSheet, View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import ListButton from './ListButton';


export default class ListForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    item: PropTypes.string,
    qty: PropTypes.number,
    notes: PropTypes.string,
    onFormSubmit: PropTypes.func.isRequired,
    onFormClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    id: null,
    item: '',
    qty: '',
    notes: '',
    showModal: false
  };

  constructor(props) {
    super(props);

    const { id, item, qty, notes } = props;

    this.state = {
      item: id ? item : '',
      qty: id ? qty : '',
      notes: id ? notes : '',
      items: [],
    };
  }

  handleItemChange = item => {
    this.setState({ item });
  };

  handleQtyChange = qty => {
    qty = parseInt(qty)
    if (isNaN(qty))
    {
      qty = 1;
    }

    this.setState({ qty });
    
  };

  handleNotesChange = notes => {
    this.setState({ notes });
  };

  handleSubmit = ()=> {
    const { onFormSubmit, id } = this.props;
    const { item, qty, notes, showModal } = this.state;

    onFormSubmit({
      id,
      item,
      qty,
      notes,
      showModal,
    });
  };

  render() {
    const { id, onFormClose } = this.props;
    const { item, qty, notes } = this.state;

    const submitText = id ? 'Update' : 'Create';

    return (
      <View style={styles.formContainer}>
        <View style={styles.textGroup}>
          <Text style={styles.textInputItem}>Item:</Text>
        <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              onChangeText={this.handleItemChange}
              value={item}
              width = {150}
            />
          </View>
          <Text style={styles.textInputItem}>Quantity: </Text>
          <View style={styles.textInputContainer}>
            <TextInput
              keyboardType = "number-pad"
              style={styles.textInput}
              underlineColorAndroid="transparent"
              onChangeText={this.handleQtyChange}
              value={qty}
              width={50}
            />
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputItem}>Notes: </Text>
          <View style={styles.textInputContainer}>
            <TextInput
              underlineColorAndroid="transparent"
              onChangeText={this.handleNotesChange}
              value={notes}
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <ListButton
            small
            color="#21BA45"
            item={submitText}
            onPress={this.handleSubmit}
          />
          <ListButton
            small
            color="#DB2828"
            item="Cancel"
            onPress={onFormClose}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  attributeContainer: {
    marginVertical: 10,

  },
  textInputContainer: {
    borderColor: '#D6D7DA',
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 5,
  },
  textInput: {
    height: 25,
    padding: 5,
    fontSize: 12,
  },
  textInputItem: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
