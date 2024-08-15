import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress = () => {}, children }) => {
  return (
    <TouchableOpacity style={styles.calculateButton} onPress={onPress}>
      <Text style={styles.calculateButtonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  calculateButton: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 50,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomButton;
