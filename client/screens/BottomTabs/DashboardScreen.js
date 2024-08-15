// screens/Dashboard.js

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import StartingSection from '../../components/Dashboard/StartingSection';
import SecondSection from '../../components/Dashboard/SecondSection';

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <StartingSection />
      <SecondSection />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c6e53',
  },
});

export default Dashboard;
