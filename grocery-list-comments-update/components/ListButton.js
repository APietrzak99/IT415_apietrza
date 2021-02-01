import {
  ColorPropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

export default function ListButton({
  color,
  item,
  small,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color }]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          small ? styles.small : styles.large,
          { color:'white' },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
}

ListButton.propTypes = {
  color: ColorPropType.isRequired,
  item: PropTypes.string.isRequired,
  small: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

ListButton.defaultProps = {
  small: false,
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    minWidth: 100,
    borderWidth: 2,
    borderRadius: 3,
    borderColor:'#cacaca'
  },
  small: {
    fontSize: 14,
    padding: 5,
  },
  large: {
    fontSize: 16,
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  item: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
