import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import CarbonFootprintScreen from './screens/checkCarbonfootPrint/CarbonFootprintScreen';
import ConfirmScreen from './screens/checkCarbonfootPrint/ConfirmScreen';
import DetailScreen from './screens/checkCarbonfootPrint/DetailScreen';
import TravelScreen from './screens/checkCarbonfootPrint/TravelScreen';
import FoodScreen from './screens/checkCarbonfootPrint/FoodScreen';
import LocalTravelScreen from './screens/checkCarbonfootPrint/LocalTravelScreen';
import ResultScreen from './screens/checkCarbonfootPrint/ResultScreen';
import LeaderBoardScreen from './screens/BottomTabs/LeaderBoardScreen';
import EcoChallengesScreen from './screens/BottomTabs/EcoChallengesScreen';
import CommunityScreen from './screens/BottomTabs/CommunityScreen';
import MarketplaceScreen from './screens/BottomTabs/MarketplaceScreen';
import DashboardScreen from './screens/BottomTabs/DashboardScreen';
import AccountScreen from './screens/BottomTabs/AccountScreen'; // Import AccountScreen here
import LoginScreen from './screens/Account/LoginScreen'; 
import CreateAccountScreen from './screens/Account/CreateAccountScreen';

import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import OffsetCarbonScreen from './screens/BottomTabs/OffsetCarbonScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardWithHeader({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Result')}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" style={{ marginLeft: 15 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <Ionicons name="person-sharp" size={24} color="black" style={{ marginRight: 15 }} />
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
      initialRouteName="DashboardWithHeader"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'LeaderBoard') {
            iconName = 'trophy-sharp';
          } else if (route.name === 'Community') {
            iconName = 'people-sharp';
          } else if (route.name === 'EcoChallenges') {
            iconName = 'globe-sharp';
          } else if (route.name === 'Marketplace') {
            iconName = 'cart-sharp';
          } else if (route.name === 'DashboardWithHeader') {
            iconName = 'home-sharp';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="LeaderBoard" component={LeaderBoardScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="DashboardWithHeader" component={DashboardWithHeader} options={{ headerShown: false }} />
      <Tab.Screen name="EcoChallenges" component={EcoChallengesScreen} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
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
          <Stack.Screen name="Offset" component={OffsetCarbonScreen}  options={{ 
              headerShown: true, 
              title: 'Offset Carbon' 
              }}  /> 
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} /> 
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Account" component={AccountScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// Ignore specific log notifications by message
LogBox.ignoreLogs(['Support for defaultProps will be removed']);
