import { SafeAreaView, View, ViewPropTypes,Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import NavigationBar from '../components/NavigationBar';

export default function Notes({
  style,
  notes,
  onClose,
}) {
  return (
    <SafeAreaView style={style}>
      <NavigationBar
        title="Notes"
        leftText="Close"
        onPressLeftText={onClose}
      />
      <Text>{notes}</Text>
    </SafeAreaView>
  );
}

Notes.propTypes = {
  style: ViewPropTypes.style,
  notes: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

Notes.defaultProps = {
  style: null,
};
