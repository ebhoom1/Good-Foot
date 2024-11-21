import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Circle = ({ number, style }) => {
  return (
    <TouchableOpacity style={[styles.circle, style]} >
      <Text style={styles.text}>{number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    width:80, // Adjusted size
    height:80, // Adjusted size
    borderRadius: 50, // Adjusted for the new size
    backgroundColor: 'transparent', // New color
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderWidth: 5, // Added border
    borderColor: 'white', // Border color
    marginTop:40,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30, // Increased font size
  },
});

export default Circle;
