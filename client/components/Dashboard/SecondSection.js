// components/Dashboard/SecondSection.js

import React, { useCallback,useState,useEffect } from 'react';

import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Circle, G, Text as SvgText,Rect } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AchievementsRecentProducts from '../Cards/AchievementsRecentProducts';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../util/api';

const screenWidth = Dimensions.get('window').width;

const SecondSection = ({ dailyEmissions = [0.9, 0.5, 0.3, 0.6, 0.2, 0.9, 0.8], weeklyGoals = [100, 50, 20, 85, 15, 10, 0] }) => {
  const navigation = useNavigation(); // Hook to access the navigation prop
  const [totalPoints, setTotalPoints] = useState(null); // For total points
  const [totalCarbonEmissions, setTotalCarbonEmissions] = useState(null); // For total carbon emissions
  const [monthlyEmissions, setMonthlyEmissions] = useState([]); // For monthly emissions
  // Fetch user data including totalPoints and totalCarbonEmissions
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          const response = await axios.get(`${API_URL}/api/users/me`, config);
          const userData = response.data.user;

          // Set totalPoints and totalCarbonEmissions from the response
          setTotalPoints(userData.totalPoints || 'N/A'); 
          setTotalCarbonEmissions(userData.carbonFootprint?.totalCO2Emissions || 0);

          // Fetch carbonFootprintHistory for graph data
          const footprintHistory = userData.carbonFootprintHistory || [];
          setMonthlyEmissions(footprintHistory); // Setting monthly emissions
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Unable to fetch user data.');
      }
    };

    fetchUserData();
  }, []);

  // Navigation handlers
  const handleNavigateMonthlyCalculator = useCallback(() => {
    navigation.navigate('MonthlyCalculator');
  }, [navigation]);

  const handleNavigateOffset = useCallback(() => {
    navigation.navigate('MonthlyCalculator');
  }, [navigation]);

  const renderGraph = () => {
    if (monthlyEmissions.length === 0) {
        return <Text>No data available for graph</Text>;
    }

    const graphWidth = screenWidth - 40; // Total width of the graph
    const graphHeight = 100; // Adjusted height of the graph to fit within trends section
    const barWidth = graphWidth / monthlyEmissions.length - 65; // Width of each bar with padding between

    // Find the maximum CO2 value to scale the bars correctly
    const maxCO2Emission = Math.max(...monthlyEmissions.map(item => item.totalCO2Emissions || 0));

    return (
        <Svg height={graphHeight + 40} width={graphWidth}> 
            {monthlyEmissions.map((item, index) => {
                const barHeight = (item.totalCO2Emissions / maxCO2Emission) * graphHeight || 0; // Calculate height of each bar
                const month = item.month || 'N/A'; // Extract month data
                
                return (
                    <G key={index} transform={`translate(${index * (barWidth + 20)}, 0)`}>
                        {/* Bar Rect */}
                        <Rect
                            x="5" // Adjust X to add padding inside each bar
                            y={graphHeight - barHeight} // Align bar top
                            width={barWidth} // Bar width 
                            height={barHeight} // Bar height scaled to max CO2
                            fill="#10ac84"
                        />
                        {/* Month Labels */}
                        <SvgText
                            x={barWidth / 2}
                            y={graphHeight + 15} // Below the bars
                            fontSize="10"
                            fill="black"
                            textAnchor="middle"
                        >
                            {month}
                        </SvgText>
                        {/* CO2 Values above bars */}
                        <SvgText
                            x={barWidth / 2}
                            y={graphHeight - barHeight - 5} // Above the bar
                            fontSize="10"
                            fill="black"
                            textAnchor="middle"
                        >
                            {item.totalCO2Emissions.toFixed(1)}
                        </SvgText>
                    </G>
                );
            })}
        </Svg>
    );
};


  
  return (
    <View style={styles.container}>
                   
      <AchievementsRecentProducts
        title="Monthly Carbon Footprint"
        description="Calculate your monthly carbon emission here."
        buttonText="Find"
        onButtonPress={handleNavigateMonthlyCalculator}
      />
      <LinearGradient
        colors={['#1dd1a1', '#10ac84']}
        style={styles.leaderboard}
      >
  

        <View style={styles.leaderboardTextContainer}>
          <Text style={styles.leaderboardText}>Leaderboard</Text>
          <Text style={styles.leaderboardPlace}>10451th place</Text>
          <Text style={styles.leaderboardPoints}>You have earned 0 pts</Text>
        </View>
        <View style={styles.leaderboardAvatarContainer}>
          <View style={styles.leaderboardAvatar}>
            <Text style={styles.avatarText}>MF</Text>
          </View>
          <View style={styles.leaderboardAvatarOverlap}>
            <Text style={styles.avatarOverlapText}>104...</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.streakContainer}>
        <View style={styles.streakHeader}>
          <Text style={styles.streakText}>Current streak: 0 Days</Text>
          <FontAwesome5 name="fire" size={24} color="white" />
        </View>
        <View style={styles.weekContainer}>
          <View style={styles.weekDay}>
            <Text style={styles.weekDayText}>Mo</Text>
            <FontAwesome5 name="times-circle" size={16} color="#34495e" />
          </View>
          <View style={styles.weekDay}>
            <Text style={styles.weekDayText}>Tu</Text>
            <FontAwesome5 name="times-circle" size={16} color="#34495e" />
          </View>
          <View style={styles.weekDay}>
            <Text style={styles.weekDayText}>We</Text>
            <FontAwesome5 name="times-circle" size={16} color="#34495e" />
          </View>
          <View style={styles.weekDay}>
            <Text style={styles.weekDayText}>Th</Text>
            <FontAwesome5 name="clock" size={16} color="#f39c12" />
          </View>
          <View style={styles.weekDay}>
            <Text style={styles.weekDayText}>Fr</Text>
            <FontAwesome5 name="circle" size={16} color="#bdc3c7" />
          </View>
          <View style={styles.weekDay}>
            <Text style={styles.weekDayText}>Sa</Text>
            <FontAwesome5 name="circle" size={16} color="#bdc3c7" />
          </View>
          <View style={styles.weekDay}>
            <Text style={styles.weekDayText}>Su</Text>
            <FontAwesome5 name="circle" size={16} color="#bdc3c7" />
          </View>
        </View>
      </View>
      <View style={styles.highlightsHeader}>
        <Text style={styles.highlightsText}>Highlights</Text>
        <Text style={styles.highlightsMore}>See more</Text>
      </View>
      <View style={styles.highlights}>
       
      <View style={styles.highlightBox}>
          <View style={styles.highlightHeader}>
            <Text style={styles.highlightLabel}>CO2e Tracked</Text>
            <FontAwesome5 name="question-circle" size={16} color="#34495e" />
          </View>
          <Text style={styles.highlightValue}>
            {totalCarbonEmissions} kg <FontAwesome5 name="globe" size={16} color="black" />
          </Text>
        </View>
        <View style={styles.highlightBox}>  
          <View style={styles.highlightHeader}>
            <Text style={styles.highlightLabel}>Trees Planted</Text>
            <FontAwesome5 name="question-circle" size={16} color="#34495e" />
          </View>
          <Text style={styles.highlightValue}>
            0 <FontAwesome5 name="tree" size={16} color="black" />
          </Text>
        </View>
        <View style={styles.highlightBox}>
          <View style={styles.highlightHeader}>
            <Text style={styles.highlightLabel}>CO2e Removed</Text>
            <FontAwesome5 name="question-circle" size={16} color="#34495e" />
          </View>
          <Text style={styles.highlightValue}>
            0 kg <FontAwesome5 name="globe" size={16} color="black" />
          </Text>
        </View>
        <View style={styles.highlightBox}>
          <View style={styles.highlightHeader}>
            <Text style={styles.highlightLabel}>Medals Achieved</Text>
            <FontAwesome5 name="question-circle" size={16} color="#34495e" />
          </View>
          <Text style={styles.highlightValue}>
            0 <FontAwesome5 name="medal" size={16} color="black" />
          </Text>
        </View>
        <View style={styles.highlightBox}>
          <View style={styles.highlightHeader}>
            <Text style={styles.highlightLabel}>Total Score</Text>
            <FontAwesome5 name="question-circle" size={16} color="#34495e" />
          </View>
          <Text style={styles.highlightValue}>
            {totalPoints} <FontAwesome5 name="coins" size={16} color="black" />
          </Text>
        </View>
        
      </View>
      
      
      <View style={styles.trendsHeader}>
        <Text style={styles.trendsText}>Trends</Text>
        <Text style={styles.trendsMore}>What's this?</Text>
      </View>
      
      <View style={styles.trends}>
        <View style={styles.trendBox}>
          <Text style={styles.trendLabel}>Month Emission Graph</Text>
          <View style={styles.trendChart}>{renderGraph()}</View>
        </View>
      </View>
      <AchievementsRecentProducts
        title="Track Your Achievements"
        description="View your recent achievements and carbon reduction projects."
        buttonText="View Projects"
        onButtonPress={handleNavigateOffset} // Custom navigation
      />
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  leaderboard: {
    borderRadius: 10,
    padding: 15,
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leaderboardTextContainer: {
    flex: 1,
  },
  leaderboardText: {
    color: 'white',
    fontSize: 16,
  },
  leaderboardPlace: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  leaderboardPoints: {
    color: 'white',
    fontSize: 14,
  },
  leaderboardAvatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderboardAvatar: {
    backgroundColor: 'black',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
  },
  leaderboardAvatarOverlap: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -20,
  },
  avatarOverlapText: {
    color: 'white',
    fontSize: 16,
  },
  streakContainer: {
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
  },
  streakHeader: {
    backgroundColor: '#ff6b6b',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  streakText: {
    color: 'white',
    fontSize: 16,
  },
  weekContainer: {
    backgroundColor: '#ecf0f1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  weekDay: {
    alignItems: 'center',
  },
  weekDayText: {
    color: '#34495e',
    fontSize: 16,
    marginBottom: 5,
  },
  highlightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  highlightsText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  highlightsMore: {
    color: '#1e90ff',
    fontSize: 16,
  },
  highlights: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  highlightBox: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  highlightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  highlightValue: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  highlightLabel: {
    color: 'black',
    fontSize: 16,
  },
  questionIcon: {
    marginLeft: 5,
  },
  trendsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  trendsText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  trendsMore: {
    color: '#1e90ff',
    fontSize: 16,
  },
  trends: {
    marginTop: 20,
    marginBottom: 20, // Adjusted to ensure proper spacing
  },
  trendBox: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    height: 180, // Adjusted height to fit the graph
  },
  trendChart: {
    height: 120, // Set a specific height for the trend chart container
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  trendLabel: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom:25,
  },
  trendSubtitle: {
    color: '#7f8c8d',
    fontSize: 14,
    marginTop: 5,
  },
  trendValue: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  
  trendBar: {
    width: 20,
    backgroundColor: '#b4babd',
    borderRadius: 5,
    
  },
  trendDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  trendDay: {
    color: '#34495e',
    fontSize: 14,
    width: 20,
    textAlign: 'center',
  },
  trendCircles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  trendCircle: {
    width: 30,
    height: 30,
    backgroundColor: '#f4f4f4',
    borderWidth: 2,
    borderColor: '#bdc3c7',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendCircleText: {
    color: 'black',
    fontSize: 12,
  },
});

export default SecondSection;
