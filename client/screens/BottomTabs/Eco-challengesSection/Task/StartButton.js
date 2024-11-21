import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const StartButton = ({ startTask }) => {
  return (
    <TouchableOpacity style={styles.startButton} onPress={startTask}>
      <Text style={styles.startButtonText}>Start Task</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  startButton: {
    backgroundColor: '#FF7F50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  startButtonText: { fontSize: 16, color: 'white', fontWeight: 'bold' },
});

export default StartButton;
