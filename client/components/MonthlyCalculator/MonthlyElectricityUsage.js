import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomInputField from '../UI/CustomInputField';

const MonthlyElectricityUsage = ({ onElectricityChange }) => {
  const [usage, setUsage] = useState('');

  // Pass electricity usage to parent when it changes
  useEffect(() => {
    if (onElectricityChange) {
      onElectricityChange(usage);
    }
  }, [usage, onElectricityChange]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Electric Usage</Text>
      <CustomInputField
        label="Electricity Usage (kWh)"
        value={usage}
        onChangeText={setUsage}
        placeholder="Enter usage for the month"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default MonthlyElectricityUsage;
