import PropTypes from 'prop-types';
import React from 'react';

import Item from './Item';
import ListForm from './ListForm';

export default class EditableFoods extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    qty: PropTypes.number.isRequired,
    notes: PropTypes.string.isRequired,
    isPurchased: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    onStartPress: PropTypes.func.isRequired,
    onStopPress: PropTypes.func.isRequired,
  };

  state = {
    editFormOpen: false,
  };

  handleEditPress = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = items => {
    const { onFormSubmit } = this.props;

    onFormSubmit(items);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    const {
      id,
      item,
      qty,
      isPurchased,
      notes,
      onRemovePress,
      onNotesPress,
      onStartPress,
      onStopPress,
    } = this.props;
    const { editFormOpen } = this.state;

    if (editFormOpen) {
      return (
        <ListForm
          id={id}
          item={item}
          qty={qty}
          notes={notes}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    }

    return (
      <Item
        id={id}
        item={item}
        qty={qty}
        isPurchased={isPurchased}
        notes={notes}
        onEditPress={this.handleEditPress}
        onRemovePress={onRemovePress}
        onStartPress={onStartPress}
        onNotesPress = {onNotesPress}
        onStopPress={onStopPress}
      />
    );
  }
}
