import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DropdownInputField = ({ label, options, selectedOption, onOptionSelect }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.dropdown}>
        <Text style={styles.dropdownText}>
          {selectedOption ? selectedOption : `Select ${label}`}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#333" />
      </TouchableOpacity>
      <Modal visible={isVisible} transparent={true} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsVisible(false)}>
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => { onOptionSelect(item); setIsVisible(false); }}
                  style={[
                    styles.option,
                    selectedOption === item && styles.selectedOption // Highlight selected option
                  ]}
                >
                  <Text style={[
                    styles.optionText,
                    selectedOption === item && styles.selectedOptionText // Highlight selected text
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 10,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOption: {
    backgroundColor: '#ffecf0', // Soft red highlight
  },
  selectedOptionText: {
    color: '#ff5a5f', // Highlight selected text in red
  },
});

export default DropdownInputField;
