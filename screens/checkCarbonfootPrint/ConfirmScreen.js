import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CountryPickerInput from '../../components/UI/CountryPickerInput';
import CustomButton from '../../components/Button/CustomButton';

const ConfirmScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const confirmed = () => {
    navigation.navigate('Detail', {
      country: selectedCountry?.name || 'Unknown',
      carbonFootprint: '2.0',
      flag:selectedCountry?.flag ,
    });
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="close"
        size={24}
        style={styles.closeIcon}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.title}>Please confirm</Text>
      <Text style={styles.subtitle}>your country of residence:</Text>
      <CountryPickerInput
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <CustomButton onPress={confirmed}>Confirm</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ConfirmScreen;
