import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import EditProfileModal from './EditProfileModal'; 
import { API_URL } from '../../util/api';

const AccountScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    profileImage: '',
    username: '',
    phone: '',
    email: '',
    address: {},
    carbonFootprint: {
      totalCO2Emissions: 0,
      country: '',
      state: '',
    }
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Fetch user data from backend when the screen is loaded
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          const response = await axios.get(`${API_URL}/api/users/me`, config);
          setUserData(response.data.user);  // Assuming response.data.user contains user details
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      Alert.alert('Logged out', 'You have been logged out successfully!');
      navigation.navigate('Home');  // Redirect to login screen after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleEditPress = () => {
    setIsModalVisible(true);
  };
  const handleSave = (updatedUser) => {
    setUserData(updatedUser);
  };
  return (
    <LinearGradient
      colors={isDarkMode ? ['#0d0d0d', '#333'] : ['#f0f0f0', '#ffffff']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: userData.profileImage || 'https://via.placeholder.com/150' }} 
            style={styles.profileImage} 
          />
          <Text style={styles.profileName}>{userData.username || 'N/A'}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone number</Text>
            <Text style={styles.detailValue}>{userData.phone || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email address</Text>
            <Text style={styles.detailValue}>{userData.email || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Country</Text>
            <Text style={styles.detailValue}>{userData.carbonFootprint.country || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>State</Text>
            <Text style={styles.detailValue}>{userData.carbonFootprint.state || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date From Calculated</Text>
            <Text style={styles.detailValue}>{userData.carbonFootprint.DateFromCalculated || 'N/A'}</Text>
          </View>
        </View>

        

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </ScrollView>
      <EditProfileModal 
        isVisible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        userData={userData} 
        onSave={handleSave} 
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
  },
  carbonFootprintContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: 'center',
  },
  carbonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  vehicleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  vehicleContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    width: '100%',
  },
  vehicleText: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
  },

});

export default AccountScreen;
