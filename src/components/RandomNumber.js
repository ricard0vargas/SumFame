import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import React from 'react';

export default RandomNumber = ({ id, number, disabled, onSelected }) => {

  const handlePress = () => {
    if (!disabled)
      onSelected(id);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.random, disabled && styles.disabled]} >{number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  random: {
    backgroundColor: '#999',
    width: 100,
    minHeight: 45,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.3,
  },
});