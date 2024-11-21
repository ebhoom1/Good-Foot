import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const GoogleButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.googleButton} onPress={onPress}>
      <Image
        source={require('../../assets/google.png')}
        style={styles.googleLogo}
      />
      <Text style={styles.googleText}>Continue with Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginVertical: 10,
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoogleButton;
