import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskInfo = ({ taskNo, name, challenge, benefitsToSociety, timeline, points, carbonEmission }) => {
  return (
    <View>
      <Text style={styles.taskTitle}>Task {taskNo}: {name}</Text>
      <Text style={styles.taskInfo}>Challenge: {challenge || 'No challenge info provided'}</Text>
      <Text style={styles.taskBenefits}>Benefits to Society: {benefitsToSociety || 'No benefits info provided'}</Text>
      <Text style={styles.taskTimeline}>Timeline: {timeline || 'No timeline info provided'}</Text>
      <Text style={styles.taskPoints}>Points: {points || 'No points info provided'}</Text>
      <Text style={styles.taskEmission}>Carbon Emission: {carbonEmission || 'N/A'} kg</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  taskInfo: { fontSize: 16, color: '#555', marginBottom: 10 },
  taskBenefits: { fontSize: 14, color: '#666', marginBottom: 10 },
  taskTimeline: { fontSize: 14, color: '#666', marginBottom: 10 },
  taskPoints: { fontSize: 14, color: '#666', marginBottom: 10 },
  taskEmission: { fontSize: 14, color: '#666', marginBottom: 20 },
});

export default TaskInfo;
