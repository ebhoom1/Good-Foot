import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomInputField from '../UI/CustomInputField';
import DropdownInputField from '../UI/DropdownInputField';

const MonthlyFlightTravel = ({ onFlightDataChange }) => {
  const [flightClass, setFlightClass] = useState(null);
  const [hours, setHours] = useState('');

  const flightOptions = ['Economy', 'Business', 'First'];

  // Update parent with the flight data whenever a field changes
  useEffect(() => {
    if (onFlightDataChange) {
      onFlightDataChange([{ flightClass, hours }]);
    }
  }, [flightClass, hours, onFlightDataChange]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Flight Travel</Text>
      
      <DropdownInputField
        label="Flight Class"
        options={flightOptions}
        selectedOption={flightClass}
        onOptionSelect={setFlightClass}
      />
      
      <CustomInputField
        label="Hours"
        value={hours}
        onChangeText={setHours}
        placeholder="Enter flight hours"
        keyboardType="numeric"
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

export default MonthlyFlightTravel;
