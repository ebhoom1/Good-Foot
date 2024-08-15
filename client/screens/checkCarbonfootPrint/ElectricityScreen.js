import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Video } from 'expo-av';
import FormUI from '../../components/UI/FormUI';
import CustomInputField from '../../components/UI/CustomInputField';
import CustomButton from '../../components/Button/CustomButton';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { API_URL } from '../../util/api';

const ElectricityScreen = ({ navigation, route }) => {
  const { userInfo, vehicles } = route.params;
  const [electricityUsage, setElectricityUsage] = useState('');

  const confirmed = async () => {
    if (!electricityUsage) {
      Toast.show({
        type: 'error',
        text1: 'Input Required',
        text2: 'Please enter your electricity usage before submitting.',
      });
      return;
    }

    const data = {
      userName: userInfo.userName,
      startDate: userInfo.startDate,
      country: userInfo.country,
      state: userInfo.state,
      vehicles,
      electricityUsage: parseFloat(electricityUsage),
    };

    console.log('Sending data to backend:', data);

    try {
      const response = await axios.post(`${API_URL}/api/carbon-engine/create-footprint`, data);
      navigation.navigate('Result', { totalCarbonFootprint: response.data.totalCarbonFootprint });
    } catch (error) {
      console.error('Failed to create footprint:', error);
      Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2: 'There was an error submitting your data. Please try again later.',
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Video
          source={require('../../assets/electricity.mp4')}
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
            <Text style={styles.questionText}>How Much Unit of Electricity do you use?</Text>
          </View>
          <ScrollView contentContainerStyle={styles.formsContainer}>
            <FormUI>
              <CustomInputField
                label="Electricity Usage (kWh)"
                value={electricityUsage}
                onChangeText={setElectricityUsage}
                placeholder="Enter electricity usage"
                keyboardType="numeric"
              />
            </FormUI>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={confirmed}>Submit</CustomButton>
      </View>
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
    marginTop: 20,
  },
});

export default ElectricityScreen;
