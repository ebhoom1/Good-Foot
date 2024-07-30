// CountryPickerInput.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { countries } from './countries'

const CountryPickerInput = ({ selectedCountry = null, setSelectedCountry }) => {
  const [visible, setVisible] = useState(false);

  const onSelect = (country) => {
    setSelectedCountry(country);
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.inputContainer}>
        <Text style={styles.inputText}>
          {selectedCountry ? `${selectedCountry.flag} ${selectedCountry.name}` : 'Select a country'}
        </Text>
        <Ionicons name="chevron-down" size={20} />
      </TouchableOpacity>
      <Modal visible={visible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
            <Ionicons name="close" size={24} />
          </TouchableOpacity>
          <FlatList
            data={countries}
            renderItem={renderItem}
            keyExtractor={(item) => item.code}
          />
        </View>
      </Modal>
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
    width: '80%',
  },
  inputText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  flag: {
    fontSize: 24,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
  },
});

export default CountryPickerInput;
