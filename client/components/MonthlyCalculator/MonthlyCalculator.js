import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SetDate from './SetDate';
import MonthlyTravel from './MonthlyTravel';
import MonthlyElectricityUsage from './MonthlyElectricityUsage';
import MonthlyFlightTravel from './MonthlyFlightTravel';
import { API_URL } from '../../util/api';

const MonthlyCalculator = () => {
  const [userId, setUserId] = useState(null);
  const [totalCO2Emissions, setTotalCO2Emissions] = useState(null);
  const [date, setDate] = useState(new Date());
  const [travelData, setTravelData] = useState([]); // Updated to be an array
  const [electricityUsage, setElectricityUsage] = useState('');
  const [flightData, setFlightData] = useState([]);
  const [monthlyCarbonFootprint, setMonthlyCarbonFootprint] = useState(null); // To store fetched carbon data

  // Get userId from local storage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          fetchMonthlyCarbonFootprint(storedUserId); // Fetch monthly carbon footprint when userId is available
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    fetchUserId();
  }, []);

  // Fetch monthly carbon footprint
  const fetchMonthlyCarbonFootprint = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/carbon-engine-month/last/${userId}`);
      setMonthlyCarbonFootprint(response.data);
      console.log("Fetched monthly carbon footprint:", response.data);
    } catch (error) {
      console.error("Error fetching monthly carbon footprint:", error);
    }
  };

  // Submit data to calculate CO2 emissions
  const handleSubmit = async () => {
    try {
      // Format date to dd/mm/yyyy
      const formattedDate = date.toLocaleDateString('en-GB');

      console.log("Submitting data:", {
        startDate: formattedDate,
        electricityUsage: electricityUsage || "0",
        vehicleUsage: travelData,
        flightUsage: flightData
      });

      const response = await axios.post(`${API_URL}/api/carbon-engine-month/calculate/${userId}`, {
        startDate: formattedDate,
        electricityUsage: electricityUsage || "0",
        vehicleUsage: travelData,
        flightUsage: flightData,
      });

      const { totalCO2Emissions } = response.data.newMonthCarbon;
      setTotalCO2Emissions(totalCO2Emissions.toFixed(2));

      Alert.alert('Success', `CO2 emissions calculated: ${totalCO2Emissions} kg CO2`);
    } catch (error) {
      console.error('Error calculating CO2 emissions:', error);
      console.error('Response error data:', error.response ? error.response.data : "No response data");

      Alert.alert('Error', 'There was an issue calculating your CO2 emissions.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#1dd1a1', '#10ac84']}
        style={styles.container}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.avoidingView}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            
            {/* Header View with Carbon Footprint Data */}
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Monthly Calculator</Text>
             
              <View style={styles.carbonHeader}>
                <Text style={styles.carbonHeaderText}>Last Month Emission</Text>
                {monthlyCarbonFootprint && monthlyCarbonFootprint.totalCO2Emissions !== undefined ? (
                  <Text style={styles.co2Text}> {monthlyCarbonFootprint.totalCO2Emissions.toFixed(2)} kg CO2</Text>
                ) : (
                  <Text style={styles.co2Text}>Fetching latest data or no data available...</Text>
                )}
                {totalCO2Emissions && (
                <Text style={styles.co2Text}>Updating Data: {totalCO2Emissions} kg CO2</Text>
              )}
              </View>
            </View>

            {/* Form for Monthly Calculator */}
            <View style={styles.section}>
              <SetDate onDateChange={setDate} />
            </View>
            <View style={styles.section}>
              <MonthlyTravel onTravelDataChange={setTravelData} />
            </View>
            <View style={styles.section}>
              <MonthlyFlightTravel onFlightDataChange={setFlightData} />
            </View>
            <View style={styles.section}>
              <MonthlyElectricityUsage onElectricityChange={setElectricityUsage} />
            </View>

            {/* Submit button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveButtonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    padding: 40,
  },
  carbonHeader: {
    backgroundColor: '#fff', // White background
    borderRadius: 15, // Rounded corners
    padding: 20,
    marginTop:20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  carbonHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  co2Text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#232020',
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#1dd1a1',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 50,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MonthlyCalculator;
