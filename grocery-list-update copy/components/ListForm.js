import { StyleSheet, View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import ListButton from './ListButton';

export default class ListForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    item: PropTypes.string,
    qty: PropTypes.string,
    picture: PropTypes.string,
    isPurchased: PropTypes.bool.isRequired, 
    onFormSubmit: PropTypes.func.isRequired,
    onFormClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    id: null,
    item: '',
    qty: '',
  };

  constructor(props) {
    super(props);

    const { id, item, qty } = props;

    this.state = {
      item: id ? item : '',
      qty: id ? qty : '',
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

  handleSubmit = () => {
    const { onFormSubmit, id } = this.props;
    const { item, qty } = this.state;

    onFormSubmit({
      id,
      item,
      qty,
    });
  };

  render() {
    const { id, onFormClose, isPurchased } = this.props;
    const { item, qty} = this.state;

    const submitText = id ? 'Update' : 'Create';
    const purchaseText = isPurchased ? 'This Item is Purchased' : 'This Item is not Purchased';
    return (
      <View style={styles.formContainer}>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputItem}>Item: {item}</Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputItem}>Quantity</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              keyboardType = "number-pad"
              style={styles.textInput}
              underlineColorAndroid="transparent"
              onChangeText={this.handleQtyChange}
              value={qty.toString()}
            />
          </View>
        </View>
        <Text>{purchaseText}</Text>
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
    marginVertical: 8,
  },
  textInputContainer: {
    borderColor: '#D6D7DA',
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 5,
  },
  textInput: {
    height: 30,
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
});
