import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TextInputField = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
  },
});

export default TextInputField;
