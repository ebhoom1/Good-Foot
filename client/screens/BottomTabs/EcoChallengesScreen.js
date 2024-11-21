import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EcoChallengesWeek from './Eco-challengesSection/EcochallengesWeek';
import EcoChallengesMonth from './Eco-challengesSection/EcochallengesMonth';
import TaskDetails from './Eco-challengesSection/TaskDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Define a Stack for Monthly Challenges
const MonthlyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="EcoChallengesMonth" 
        component={EcoChallengesMonth} 
        options={{ headerShown: false }} 
      />
       <Stack.Screen 
    name="TaskDetails" 
    component={TaskDetails} 
    options={{ headerShown: false }} 
  />
    </Stack.Navigator>
  );
};

// Define a Stack for Weekly Challenges
const WeeklyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="EcoChallengesWeek" 
        component={EcoChallengesWeek} 
        options={{ headerShown: false }} 
      />
     <Stack.Screen 
    name="TaskDetails" 
    component={TaskDetails} 
    options={{ headerShown: false }} 
    />
    </Stack.Navigator>
  );
};

// Custom Tab Bar UI
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

        const isFocused = state.index === index;

        const iconName = route.name === 'Weekly' ? 'calendar' : 'calendar-outline';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity key={index} onPress={onPress} style={styles.tabItemContainer}>
            <View style={[styles.iconContainer, isFocused && styles.focusedIconContainer]}>
              <Ionicons name={iconName} size={isFocused ? 28 : 24} color={isFocused ? '#3aa04e' : 'gray'} />
            </View>
            {isFocused && <Text style={styles.focusedLabel}>{label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Main EcoChallengesScreen component with Tab Navigator
const EcoChallengesScreen = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen 
        name="Weekly" 
        component={WeeklyStack} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Monthly" 
        component={MonthlyStack} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
};

// Styles for the Custom Tab Bar
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'space-around',
    paddingBottom: 10,
    paddingTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 70,
  },
  tabItemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
  },
  focusedIconContainer: {
    backgroundColor: '#3aa04e',
    position: 'absolute',
    top: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  focusedLabel: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});

export default EcoChallengesScreen;
