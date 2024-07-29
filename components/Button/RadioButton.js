import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RadioButton = ({ label, value, checked, onPress }) => {
  const translateX = useRef(new Animated.Value(50)).current; // Initial position off the screen to the right
  const opacity = useRef(new Animated.Value(0)).current; // Initial opacity

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 2500,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();
  }, [translateX, opacity]);

  return (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
      <Animated.View style={[styles.animatedContainer, { transform: [{ translateX }], opacity }]}>
        <Ionicons 
          name={checked ? "radio-button-on" : "radio-button-off"} 
          size={24} 
          color="black" 
        />
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  animatedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding:10,
    borderRadius: 10,
    width:'90%'
  },
  label: {
    marginLeft: 10,
    color: 'black',
    fontSize: 18,
  },
});

export default RadioButton;
