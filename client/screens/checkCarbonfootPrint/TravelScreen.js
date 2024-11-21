import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import FormUI from '../../components/UI/FormUI';
import DropdownInputField from '../../components/UI/DropdownInputField';
import CustomInputField from '../../components/UI/CustomInputField';
import AddButton from '../../components/Button/AddButton';
import CustomButton from '../../components/Button/CustomButton';
import Toast from 'react-native-toast-message';

const flightClasses = ['Economy', 'Business', 'First'];

const TravelScreen = ({ navigation, route }) => {
  const [flights, setFlights] = useState([]);
  const [count, setCount] = useState(0); // Track the number of forms
  const { userInfo } = route.params;

  const addFlight = () => {
    setFlights([...flights, { class: '', hours: 0 }]);
    setCount(count + 1); // Increase count
  };

  const updateFlight = (index, key, value) => {
    const newFlights = [...flights];
    
    if (key === 'hours') {
      newFlights[index][key] = parseFloat(value) || 0;
    } else {
      newFlights[index][key] = value;
    }

    setFlights(newFlights);
  };

  const removeFlight = (index) => {
    const newFlights = flights.filter((_, i) => i !== index);
    setFlights(newFlights);
    setCount(count - 1); // Decrease count
  };

  const confirmed = () => {
    // Check for empty fields
    for (let i = 0; i < flights.length; i++) {
      const flight = flights[i];
      if (!flight.class || flight.hours === 0) {
        Toast.show({
          type: 'error',
          text1: 'Input Required',
          text2: `Please fill out all fields for flight ${i + 1}.`,
        });
        return;
      }
    }

    navigation.navigate('ElectricityScreen', { 
      userInfo, 
      vehicles: route.params.vehicles,  // Pass the vehicles from LocalTravelScreen
      flights, 
      count: route.params.count // Pass the count from LocalTravelScreen
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Video
          source={require('../../assets/travel.mp4')}
          style={styles.backgroundVideo}
          resizeMode="cover"
          shouldPlay
          isLooping
          isMuted
        />
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
        >
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>Add your flight details</Text>
          </View>
          <AddButton onPress={addFlight} />

          {flights.length > 0 && (
            <ScrollView contentContainerStyle={styles.formsContainer}>
              {flights.map((flight, index) => (
                <FormUI key={index} onClose={() => removeFlight(index)} showCloseButton>
                  <DropdownInputField
                    label="Flight Class"
                    options={flightClasses}
                    selectedOption={flight.class}
                    onOptionSelect={(value) => updateFlight(index, 'class', value)}
                  />
                  <CustomInputField
                    label="Flight Hours"
                    value={flight.hours.toString()}
                    onChangeText={(value) => updateFlight(index, 'hours', value)}
                    placeholder="Enter flight hours"
                    keyboardType="numeric"
                  />
                </FormUI>
              ))}
            </ScrollView>
          )}
        </KeyboardAvoidingView>
        {flights.length > 0 && (
          <View style={styles.buttonContainer}>
            <CustomButton onPress={confirmed}>Next</CustomButton>
          </View>
        )}
        <Toast />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  questionContainer: {
    marginTop: 100,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  formsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

export default TravelScreen;
