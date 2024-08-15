import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPickerInput from '../../components/UI/CountryPickerInput';
import TextInputField from '../../components/UI/TextInputField';
import StatePickerInput from '../../components/UI/StatePickerInput';
import CustomButton from '../../components/Button/CustomButton';
import Toast from 'react-native-toast-message';

const ConfirmScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [name, setName] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const confirmed = () => {
    if (!name || !selectedCountry || !selectedState) {
      Toast.show({
        type: 'error',
        text1: 'Input Required',
        text2: 'Please fill in all fields before submitting.',
      });
      return;
    }

    const userInfo = {
      country: selectedCountry?.name || 'Unknown',
      state: selectedState || 'Unknown',
      userName: name || 'Anonymous',
      startDate: date.toLocaleDateString('en-GB') || 'Unknown',
    };
    navigation.navigate('Detail', { userInfo });
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
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
      <TextInputField
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.datePickerContainer} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>
          {date.toLocaleDateString('en-GB') || 'dd/mm/yyyy'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <CountryPickerInput
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      {selectedCountry && (
        <StatePickerInput
          selectedCountry={selectedCountry}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />
      )}
      <CustomButton onPress={confirmed}>Confirm</CustomButton>
      <Toast /> 
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
  datePickerContainer: {
    marginVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 5,
    width: '100%',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
});

export default ConfirmScreen;
