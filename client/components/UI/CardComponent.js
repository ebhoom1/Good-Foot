import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const CardComponent = ({ title, content }) => (
  <Card style={styles.card}>
    <Card.Title title={title} />
    <Card.Content>
      <Text>{content}</Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
  },
});

export default CardComponent;
