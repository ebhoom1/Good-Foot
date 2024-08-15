import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderComponent = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#6200ee',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
});

export default HeaderComponent;
