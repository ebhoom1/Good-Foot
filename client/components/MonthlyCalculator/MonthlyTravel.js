import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomInputField from '../UI/CustomInputField';
import DropdownInputField from '../UI/DropdownInputField';

const MonthlyTravel = ({ onTravelDataChange }) => {
  const [distance, setDistance] = useState('');
  const [type, setType] = useState(null); // Change travelMode to type
  const [fuelType, setFuelType] = useState(null);
  const [fuelEfficiency, setFuelEfficiency] = useState('');

  const travelOptions = ['Car', 'Bike', 'Scooter'];
  const fuelOptions = ['Petrol', 'Diesel', 'CNG', 'Electric'];

  // Update parent with the travel data whenever a field changes
  useEffect(() => {
    if (onTravelDataChange) {
      onTravelDataChange([{
        type, // Pass type instead of travelMode
        fuelType,
        kilometersTraveled: distance,
        averageFuelEfficiency: fuelEfficiency,
      }]);
    }
  }, [type, fuelType, distance, fuelEfficiency, onTravelDataChange]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Travel</Text>
      
      <DropdownInputField
        label="Travelled By"
        options={travelOptions}
        selectedOption={type}
        onOptionSelect={setType}
      />
      
      <DropdownInputField
        label="Fuel Type"
        options={fuelOptions}
        selectedOption={fuelType}
        onOptionSelect={setFuelType}
      />
      
      <CustomInputField
        label="Distance Travelled (Km)"
        value={distance}
        onChangeText={setDistance}
        placeholder="Enter distance"
      />
      
      <CustomInputField
        label="Fuel Efficiency (Km/L)"
        value={fuelEfficiency}
        onChangeText={setFuelEfficiency}
        placeholder="Enter fuel efficiency"
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

export default MonthlyTravel;
