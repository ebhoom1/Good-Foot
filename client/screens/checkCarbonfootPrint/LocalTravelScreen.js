import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Video } from 'expo-av';
import FormUI from '../../components/UI/FormUI';
import DropdownInputField from '../../components/UI/DropdownInputField';
import CustomInputField from '../../components/UI/CustomInputField';
import AddButton from '../../components/Button/AddButton';
import CustomButton from '../../components/Button/CustomButton';
import Toast from 'react-native-toast-message';

const vehicleTypes = ['Car', 'Bike', 'Scooter'];
const fuelTypes = ['petrol', 'diesel', 'ev', 'cng'];

const LocalTravelScreen = ({ navigation, route }) => {
  const [vehicles, setVehicles] = useState([]);
  const [count, setCount] = useState(0); // Track the number of forms
  const { userInfo } = route.params;

  const addVehicle = () => {
    setVehicles([...vehicles, { type: '', fuelType: '', kilometersTraveled: 0, averageFuelEfficiency: 0, count: 1 }]);
    setCount(count + 1); // Increase count
  };

  const updateVehicle = (index, key, value) => {
    const newVehicles = [...vehicles];
    
    if (key === 'kilometersTraveled' || key === 'averageFuelEfficiency' || key === 'count') {
      newVehicles[index][key] = parseFloat(value) || 0;
    } else {
      newVehicles[index][key] = value.toLowerCase();
    }

    setVehicles(newVehicles);
  };

  const removeVehicle = (index) => {
    const newVehicles = vehicles.filter((_, i) => i !== index);
    setVehicles(newVehicles);
    setCount(count - 1); // Decrease count
  };

  const confirmed = () => {
    // Check for empty fields
    for (let i = 0; i < vehicles.length; i++) {
      const vehicle = vehicles[i];
      if (!vehicle.type || !vehicle.fuelType || vehicle.kilometersTraveled === 0 || vehicle.averageFuelEfficiency === 0) {
        Toast.show({
          type: 'error',
          text1: 'Input Required',
          text2: `Please fill out all fields for vehicle ${i + 1}.`,
        });
        return;
      }
    }

    navigation.navigate('ElectricityScreen', { userInfo, vehicles, count });
  };

  return (
    <>
      <View style={styles.container}>
        <Video
          source={require('../../assets/localTravel.mp4')}
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
            <Text style={styles.questionText}>Which Vehicle are you using?</Text>
          </View>
          <AddButton onPress={addVehicle} />

          {vehicles.length > 0 && (
            <ScrollView contentContainerStyle={styles.formsContainer}>
              {vehicles.map((vehicle, index) => (
                <FormUI key={index} onClose={() => removeVehicle(index)} showCloseButton>
                  <DropdownInputField
                    label="Vehicle Type"
                    options={vehicleTypes}
                    selectedOption={vehicle.type}
                    onOptionSelect={(value) => updateVehicle(index, 'type', value)}
                  />
                  <DropdownInputField
                    label="Fuel Type"
                    options={fuelTypes}
                    selectedOption={vehicle.fuelType}
                    onOptionSelect={(value) => updateVehicle(index, 'fuelType', value)}
                  />
                  <CustomInputField
                    label="How many KM have been driven"
                    value={vehicle.kilometersTraveled.toString()}
                    onChangeText={(value) => updateVehicle(index, 'kilometersTraveled', value)}
                    placeholder="Enter KM driven"
                    keyboardType="numeric"
                  />
                  <CustomInputField
                    label="Fuel Efficiency (km/l)"
                    value={vehicle.averageFuelEfficiency.toString()}
                    onChangeText={(value) => updateVehicle(index, 'averageFuelEfficiency', value)}
                    placeholder="Enter fuel efficiency"
                    keyboardType="numeric"
                  />
                </FormUI>
              ))}
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </View>
      {vehicles.length > 0 && (
        <View style={styles.buttonContainer}>
          <CustomButton onPress={confirmed}>Next</CustomButton>
        </View>
      )}
      <Toast />
    </>
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

export default LocalTravelScreen;
