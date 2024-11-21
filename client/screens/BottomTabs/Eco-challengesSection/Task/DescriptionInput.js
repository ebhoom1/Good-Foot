import React from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';

const DescriptionInput = ({ imageDescription, setImageDescription }) => {
  return (
    <>
      <Text style={styles.imageQuestion}>Please describe the images you uploaded:</Text>
      <TextInput
        style={styles.input}
        value={imageDescription}
        onChangeText={setImageDescription}
        placeholder="Enter details about the images"
        multiline={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imageQuestion: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
  },
});

export default DescriptionInput;
