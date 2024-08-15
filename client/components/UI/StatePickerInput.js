// components/UI/StatePickerInput.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { states } from '../../util/dummyData';  // Updated import

const StatePickerInput = ({ selectedCountry, selectedState, setSelectedState }) => {
  const [visible, setVisible] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);

  useEffect(() => {
    if (selectedCountry) {
      setStateOptions(states[selectedCountry.code] || []);
    }
  }, [selectedCountry]);

  const onSelect = (state) => {
    setSelectedState(state);
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
      <Text style={styles.name}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.inputContainer}>
        <Text style={styles.inputText}>
          {selectedState ? selectedState : 'Select a state'}
        </Text>
        <Ionicons name="chevron-down" size={20} />
      </TouchableOpacity>
      <Modal visible={visible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
            <Ionicons name="close" size={24} />
          </TouchableOpacity>
          <FlatList
            data={stateOptions}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
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
    padding: 10,
  },
  name: {
    fontSize: 18,
  },
});

export default StatePickerInput;
