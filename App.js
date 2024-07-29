import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import CarbonFootprintScreen from './screens/checkCarbonfootPrint/CarbonFootprintScreen';
import ConfirmScreen from './screens/checkCarbonfootPrint/ConfirmScreen';
import DetailScreen from './screens/checkCarbonfootPrint/DetailScreen';
import TravelScreen from './screens/checkCarbonfootPrint/TravelScreen';
import FoodScreen from './screens/checkCarbonfootPrint/FoodScreen';
import LocalTravelScreen from './screens/checkCarbonfootPrint/LocalTravelScreen';
import ResultScreen from './screens/checkCarbonfootPrint/ResultScreen';
import LeaderBoardScreen from './screens/BottomTabs/LeaderBoardScreen';
import OffsetCarbonScreen from './screens/BottomTabs/OffsetCarbonScreen';
import EcoChallengesScreen from './screens/BottomTabs/EcoChallengesScreen';
import AccountScreen from './screens/BottomTabs/AccountScreen';
import LoginScreen from './screens/Account/LoginScreen'; // New screen
import CreateAccountScreen from './screens/Account/CreateAccountScreen'; // New screen

import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'LeaderBoard') {
            iconName = 'trophy-sharp';
          } else if (route.name === 'OffsetCarbon') {
            iconName = 'leaf-sharp';
          } else if (route.name === 'EcoChallenges') {
            iconName = 'globe-sharp';
          } else if (route.name === 'Account') {
            iconName = 'person-sharp';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="LeaderBoard" component={LeaderBoardScreen} />
      <Tab.Screen name="OffsetCarbon" component={OffsetCarbonScreen} />
      <Tab.Screen name="EcoChallenges" component={EcoChallengesScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
    <StatusBar style='light'/>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CarbonFootprint" component={CarbonFootprintScreen} />
        <Stack.Screen name="Confirm" component={ConfirmScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} /> 
        <Stack.Screen name="Travel" component={TravelScreen} /> 
        <Stack.Screen name="Food" component={FoodScreen} /> 
        <Stack.Screen name="Localtravel" component={LocalTravelScreen} /> 
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Login" component={LoginScreen} /> 
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} /> 
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs} 
          options={{ 
            gestureEnabled: false 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  
  );
}

// Ignore specific log notifications by message
LogBox.ignoreLogs(['Support for defaultProps will be removed']);
