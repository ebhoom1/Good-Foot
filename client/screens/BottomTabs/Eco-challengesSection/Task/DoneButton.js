import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const DoneButton = ({ handleDonePress }) => {
  return (
    <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
      <Text style={styles.doneButtonText}>Done</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  doneButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 80,
  },
  doneButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DoneButton;
