import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AchievementsRecentProducts = ({ title, description, buttonText, onButtonPress }) => {
  const navigation = useNavigation(); // Hook to access the navigation prop

  return (
    <View>
      <View style={styles.sectionContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.contentText}>{description}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onButtonPress} // Navigate to OffsetScreen or use custom handler
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  contentBox: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  contentText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1dd1a1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AchievementsRecentProducts;
