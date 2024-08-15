// components/CustomCircleProgress.js

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const CustomCircleProgress = ({ data, chartConfig, value }) => {
  return (
    <View style={styles.container}>
      <ProgressChart
        data={data}
        width={screenWidth * 0.6} // Adjust width for better sizing
        height={screenWidth * 0.6} // Adjust height for better sizing
        strokeWidth={16}
        radius={104}
        chartConfig={chartConfig}
        hideLegend={true} // Hide the legend to match the design
      />
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
        <Text style={styles.labelText}>Remaining CC</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center', // Center the content
    marginVertical: 20,
    position: 'relative',
  },
  valueContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CustomCircleProgress;
