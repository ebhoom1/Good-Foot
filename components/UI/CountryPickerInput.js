// CountryPickerInput.js
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { Ionicons } from '@expo/vector-icons';

const CountryPickerInput = ({ selectedCountry, setSelectedCountry }) => {
  const [visible, setVisible] = useState(false);

  const onSelect = (country) => {
    setSelectedCountry(country);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.inputContainer}>
        <Text style={styles.inputText}>
          {selectedCountry ? ` ${selectedCountry.name}` : 'Select a country'}
        </Text>
       
        <Ionicons name="chevron-down" size={20} />
      </TouchableOpacity>
      <CountryPicker
        visible={visible}
        withEmoji
        withFilter
        withFlag
        withCountryNameButton
        onSelect={onSelect}
        onClose={() => setVisible(false)}
        containerButtonStyle={{ display: 'none' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    width:'80%'
  },
  inputText: {
    fontSize: 16,
  },
});

export default CountryPickerInput;
