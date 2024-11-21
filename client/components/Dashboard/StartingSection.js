import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import DashboardCustomButton from '../Button/DashboardCustomButton';
import CustomCircleProgress from '../UI/CustomCircleProgress';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../../util/api';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: "#4c6e53",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#4c6e53",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 35,
  barPercentage: 0.5,
  useShadowColorFromDataset: false 
};

const DashboardScreen = () => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null); // Store the complete user data here
  const [selectedSwitch, setSelectedSwitch] = useState('total'); // 'total' or 'monthly'
  const [progressData, setProgressData] = useState(0); // Default value for progress
  const [carbonValue, setCarbonValue] = useState(0); // Displayed value inside circle

  useEffect(() => {
    // Fetch user data as in AccountScreen
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          const response = await axios.get(`${API_URL}/api/users/me`, config);
          const userData = response.data.user;
          setUserData(userData);
          setUserId(userData._id);
          fetchTotalCarbonEmissions(userData); // Fetch total emissions on load
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // Fetch total carbon emissions (can use userData directly)
  const fetchTotalCarbonEmissions = (userData) => {
    try {
      const totalCO2Emissions = userData.carbonFootprint.totalCO2Emissions || 0;
      setProgressData(totalCO2Emissions / 10000); // Example calculation for progress
      setCarbonValue(totalCO2Emissions); // Set the carbon value inside the circle
    } catch (error) {
      console.error('Error calculating total carbon emissions:', error);
      Alert.alert('Error', 'Unable to calculate total carbon emissions.');
    }
  };

  // Fetch monthly carbon emissions from the backend
  const fetchMonthlyCarbonEmissions = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/carbon-engine-month/last/${userId}`);
      const monthlyCO2Emissions = response.data.totalCO2Emissions || 0;
      setProgressData(monthlyCO2Emissions / 10000); // Example calculation for progress
      setCarbonValue(monthlyCO2Emissions); // Set the carbon value inside the circle
    } catch (error) {
      console.error('Error fetching monthly carbon emissions:', error);
      Alert.alert('Error', 'Unable to fetch monthly carbon emissions.');
    }
  };

  // Handle switch button press
  const handleSwitch = (type) => {
    setSelectedSwitch(type);
    if (type === 'total') {
      fetchTotalCarbonEmissions(userData);
    } else if (type === 'monthly') {
      fetchMonthlyCarbonEmissions(userId);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity 
          style={[styles.switchButton, selectedSwitch === 'total' ? styles.activeSwitch : null]}
          onPress={() => handleSwitch('total')}
        >
          <Text style={selectedSwitch === 'total' ? styles.activeSwitchText : styles.switchText}>Total</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.switchButton, selectedSwitch === 'monthly' ? styles.activeSwitch : null]}
          onPress={() => handleSwitch('monthly')}
        >
          <Text style={selectedSwitch === 'monthly' ? styles.activeSwitchText : styles.switchText}>Monthly</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.goalText}>
        {selectedSwitch === 'total' ? 'Total Carbon Emission' : 'Monthly Carbon Emission'}
      </Text>

      <CustomCircleProgress 
        data={[progressData]} 
        chartConfig={chartConfig} 
        value={carbonValue.toFixed(2)} // Display carbon value inside circle
      />

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="flag-outline" size={24} color="white" />
          <Text style={styles.detailValue}>{carbonValue.toFixed(2)}</Text>
          <Text style={styles.detailLabel}>Total Usage</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome5 name="carrot" size={24} color="white" />
          <Text style={styles.detailValue}>0</Text>
          <Text style={styles.detailLabel}>Food</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome5 name="leaf" size={24} color="white" />
          <Text style={styles.detailValue}>0</Text>
          <Text style={styles.detailLabel}>Offsets</Text>
        </View>
      </View>

      <Text style={styles.remainingCC}>Total Carbon Usage is {carbonValue.toFixed(2)}</Text>
      <DashboardCustomButton title="Learn More" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c6e53',
    padding: 20,
    borderEndStartRadius: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#3b3b3b',
    borderRadius: 20,
    padding: 5,
    width: '60%',
    alignSelf: 'center',
  },
  switchButton: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeSwitch: {
    backgroundColor: '#27ae60'
  },
  switchText: {
    color: '#fff',
    fontSize: 14,
  },
  activeSwitchText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  goalText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    alignItems: 'center'
  },
  detailItem: {
    alignItems: 'center'
  },
  detailValue: {
    color: '#fff',
    fontSize: 20,
    marginTop: 5,
  },
  detailLabel: {
    color: '#7f8c8d'
  },
  remainingCC: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20
  }
});

export default DashboardScreen;
