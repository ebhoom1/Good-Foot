// screens/DashboardScreen.js

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import DashboardCustomButton from '../Button/DashboardCustomButton';
import CustomCircleProgress from '../UI/CustomCircleProgress';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ["Offsets"], // optional
  data: [0]
};

const chartConfig = {
  backgroundGradientFrom: "#4c6e53",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#4c6e53",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 35, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const StartingSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <View style={[styles.switchButton, styles.activeSwitch]}>
          <Text style={styles.activeSwitchText}>D</Text>
        </View>
        <View style={styles.switchButton}>
          <Text style={styles.switchText}>W</Text>
        </View>
        <View style={styles.switchButton}>
          <Text style={styles.switchText}>M</Text>
        </View>
      </View>
      <Text style={styles.goalText}>Carbon Calorie Goal</Text>
      <CustomCircleProgress data={data} chartConfig={chartConfig} value="3,120" />
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="flag-outline" size={24} color="white" />
          <Text style={styles.detailValue}>3,120</Text>
          <Text style={styles.detailLabel}>Base Goal</Text>
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
      <Text style={styles.remainingCC}>Remaining CC = Base Goal - Food + Offsets</Text>
      <DashboardCustomButton title="Learn More" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c6e53',
    padding: 20,
    borderEndStartRadius:10,
  },
  time: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'right'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#3b3b3b',
    borderRadius: 20,
    padding: 5,
    width: '60%', // Make the container 60% of its original size
    alignSelf: 'center', // Center the container
  },
  switchButton: {
    flex: 1,
    paddingVertical: 5, // Adjust padding for smaller size
    borderRadius: 20,
    alignItems: 'center',
  },
  activeSwitch: {
    backgroundColor: '#27ae60'
  },
  switchText: {
    color: '#fff',
    fontSize: 14, // Adjust font size for smaller buttons
  },
  activeSwitchText: {
    color: '#fff', // Change to white to match the provided image
    fontSize: 14, // Adjust font size for smaller buttons
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

export default StartingSection;
