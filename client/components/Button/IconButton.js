import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const IconButton = ({ onPress, icon, size, color }) => {
  return (
    <TouchableOpacity style={styles.calculateButton} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  calculateButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconButton;
