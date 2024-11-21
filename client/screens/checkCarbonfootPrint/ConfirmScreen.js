import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
  const [contactInput, setContactInput] = useState(''); // State for email or mobile number
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to check if input is a valid email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to check if input is a valid mobile number
  const isValidMobileNumber = (number) => {
    const mobileNumberRegex = /^[0-9]{10}$/; // Assumes a 10-digit mobile number format
    return mobileNumberRegex.test(number);
  };

  const confirmed = () => {
    // Check if required fields are filled
    if (!name || !selectedCountry || !selectedState || !contactInput) {
      Toast.show({
        type: 'error',
        text1: 'Input Required',
        text2: 'Please fill in all fields and provide a valid email or mobile number.',
      });
      return;
    }

    // Validate email or mobile number
    let contactType;
    if (isValidEmail(contactInput)) {
      contactType = 'email';
    } else if (isValidMobileNumber(contactInput)) {
      contactType = 'mobileNumber';
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: 'Please enter a valid email or mobile number.',
      });
      return;
    }

    // Prepare the user info object based on the input
    const userInfo = {
      country: selectedCountry?.name || 'Unknown',
      state: selectedState || 'Unknown',
      userName: name || 'Anonymous',
      startDate: date.toLocaleDateString('en-GB') || 'Unknown',
      email: contactType === 'email' ? contactInput : '',
      mobileNumber: contactType === 'mobileNumber' ? contactInput : '',
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <TextInputField
            placeholder="Enter email or mobile number" // Unified input for email or mobile
            value={contactInput}
            onChangeText={setContactInput}
            keyboardType="default" // Allow both text (email) and numeric (mobile) input
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
