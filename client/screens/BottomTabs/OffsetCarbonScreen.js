import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { offsetCarbonData } from '../../util/dummyData'; // Import the dummy data

const OffsetCarbonScreen = () => {
  const [selectedTab, setSelectedTab] = useState('latest');

  const renderCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('latest')} style={selectedTab === 'latest' ? styles.activeTab : styles.inactiveTab}>
          <Text style={styles.tabText}>Latest</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('older')} style={selectedTab === 'older' ? styles.activeTab : styles.inactiveTab}>
          <Text style={styles.tabText}>Older</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={offsetCarbonData[selectedTab]}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#45e62c1b',
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    padding: 10,
  },
  inactiveTab: {
    padding: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default OffsetCarbonScreen;
