import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Timer = ({ timeLeft }) => {
  const formatTime = () => {
    const days = Math.floor(timeLeft / (3600 * 24));
    const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <Text style={styles.timer}>Time Left: {formatTime()}</Text>
  );
};

const styles = StyleSheet.create({
  timer: { fontSize: 16, color: '#ff6347', marginBottom: 20, fontWeight: 'bold' },
});

export default Timer;
