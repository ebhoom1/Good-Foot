import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


import HomeScreen from './screens/HomeScreen';
import CarbonFootprintScreen from './screens/checkCarbonfootPrint/CarbonFootprintScreen';
import ConfirmScreen from './screens/checkCarbonfootPrint/ConfirmScreen';
import DetailScreen from './screens/checkCarbonfootPrint/DetailScreen';
import TravelScreen from './screens/checkCarbonfootPrint/TravelScreen';
import FoodScreen from './screens/checkCarbonfootPrint/FoodScreen';
import LocalTravelScreen from './screens/checkCarbonfootPrint/LocalTravelScreen';
import ResultScreen from './screens/checkCarbonfootPrint/ResultScreen';
// import LeaderBoardScreen from './screens/BottomTabs/LeaderBoardScreen';
import EcoChallengesScreen from './screens/BottomTabs/EcoChallengesScreen';
import CommunityScreen from './screens/BottomTabs/CommunityScreen';
import MarketplaceScreen from './screens/BottomTabs/MarketplaceScreen';
import DashboardScreen from './screens/BottomTabs/DashboardScreen';
import AccountScreen from './screens/BottomTabs/AccountScreen'; // Import AccountScreen here
import LoginScreen from './screens/Account/LoginScreen'; 
import CreateAccountScreen from './screens/Account/CreateAccountScreen';

import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ElectricityScreen from './screens/checkCarbonfootPrint/ElectricityScreen';
import Offset from './screens/Offset/Offset';
import OffsetProjectScreen from './screens/Offset/ProjectOffsetScreen';
import ProjectOffsetScreen from './screens/Offset/ProjectOffsetScreen';
import MonthlyCalculator from './components/MonthlyCalculator/MonthlyCalculator';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { View } from 'react-native-animatable';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardWithHeader({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="dashboard"
        component={DashboardScreen}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerBackground: () => (
            <LinearGradient
              colors={['black', '#4c6e53']}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          ),
          headerTitleStyle: {
            color: 'white',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Ionicons name="arrow-back-sharp" size={24} color="white" style={{ marginLeft: 15 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <Ionicons name="person-sharp" size={24} color="white" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="DashboardWithHeader" // Set Dashboard as the initial tab
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Community') {
            iconName = 'people-sharp';
          } else if (route.name === 'EcoChallenges') {
            iconName = 'globe-sharp';
          } else if (route.name === 'Marketplace') {
            iconName = 'cart-sharp';
          } else if (route.name === 'Dashboard') {
            iconName = 'home-sharp'; // Set icon for Dashboard
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3aa04e',
        tabBarInactiveTintColor: 'white',
        tabBarBackground: () => (
          <LinearGradient
            colors={['black', '#4c6e53']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        ),
      })}
    >
       <Tab.Screen name="Dashboard" component={DashboardWithHeader} options={{ headerShown: false }} />
      <Tab.Screen name="Community" component={CommunityScreen} options={{ headerShown: false }} />
      <Tab.Screen name="EcoChallenges" component={EcoChallengesScreen}  options={{ headerShown: false }}/>
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
    </Tab.Navigator>
  );
}




// App component
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state to handle the async check

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoggedIn(false); // Default to not logged in on error
    } finally {
      setLoading(false); // Stop loading once the check is done
    }
  };

  if (loading) {
    // Show a loading indicator while checking login status
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3aa04e" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'MainTabs' : 'Home'} screenOptions={{ headerShown: false }}>
          {/* Home screen */}
          <Stack.Screen name="Home" component={HomeScreen} />
          
          {/* MainTabs for logged-in users */}
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ gestureEnabled: false, headerShown: false }} />

          {/* Other screens */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="CarbonFootprint" component={CarbonFootprintScreen} />
          <Stack.Screen name="Confirm" component={ConfirmScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="LocalTravel" component={LocalTravelScreen} />
          <Stack.Screen name="FlightTravel" component={TravelScreen} />
          <Stack.Screen name="ElectricityScreen" component={ElectricityScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="Offset" component={Offset} options={{ headerShown: true, title: 'Offset Carbon' }} />
          <Stack.Screen name="Offset-Project" component={ProjectOffsetScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MonthlyCalculator" component={MonthlyCalculator} />
          <Stack.Screen name='Account' component={AccountScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// Ignore specific log notifications by message
LogBox.ignoreLogs(['Support for defaultProps will be removed']);

