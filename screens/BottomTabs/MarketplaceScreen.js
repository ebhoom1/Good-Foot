// screens/BottomTabs/MarketplaceScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MarketplaceScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Add Groceries"
          placeholderTextColor="#555"
          style={styles.searchInput}
        />
        <Ionicons name="search" size={24} color="#555" style={styles.searchIcon} />
      </View>
      <View style={styles.shoppingListContainer}>
        <Text style={styles.title}>Shopping List</Text>
        <Text style={styles.inStoreButton}>In Store <Ionicons name="cart" size={18} color="white" /></Text>
      </View>
      <View style={styles.brandsContainer}>
        <Text style={styles.brand}>Ocado</Text>
        <Text style={styles.brand}>TESCO</Text>
        <Text style={styles.brand}>Waitrose</Text>
        <Text style={styles.brand}>Amazon Fresh</Text>
      </View>
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>Your shopping list is empty</Text>
      </View>
      <View style={styles.comingSoonContainer}>
        <Image
          source={{ uri: 'https://example.com/your-image.jpg' }}
          style={styles.comingSoonImage}
        />
        <Text style={styles.comingSoonTitle}>Coming Soon</Text>
        <Text style={styles.comingSoonText}>
          You'll be able to order groceries to your doorstep, very soon. In the meantime, please use the list above to shop in-store.
        </Text>
        <View style={styles.joinWaitlistButton}>
          <Text style={styles.joinWaitlistButtonText}>Join waitlist</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0c7403',
    padding: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#555',
  },
  searchIcon: {
    marginLeft: 10,
  },
  shoppingListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inStoreButton: {
    backgroundColor: '#00C853',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  brandsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  brand: {
    fontSize: 16,
    color: '#555',
  },
  emptyListContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyListText: {
    fontSize: 16,
    color: '#555',
  },
  comingSoonContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
  },
  comingSoonImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comingSoonText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  joinWaitlistButton: {
    backgroundColor: '#00C853',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  joinWaitlistButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MarketplaceScreen;
