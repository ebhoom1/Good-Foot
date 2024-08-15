// components/Dashboard/SecondSection.js

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Circle, G, Text as SvgText } from 'react-native-svg';
import AchievementsRecentProducts from '../Cards/AchievementsRecentProducts';

const screenWidth = Dimensions.get('window').width;

const SecondSection = ({ dailyEmissions = [0.9, 0.5, 0.3, 0.6, 0.2, 0.9, 0.8], weeklyGoals = [100, 50, 20, 85, 15, 10, 0] }) => {
  return (
    <View style={styles.container}>
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
            <Text style={styles.highlightLabel}>Tracked Items</Text>
            <FontAwesome5 name="question-circle" size={16} color="#34495e" />
          </View>
          <Text style={styles.highlightValue}>
            0 <FontAwesome5 name="shoe-prints" size={16} color="black" />
          </Text>
        </View>
        <View style={styles.highlightBox}>
          <View style={styles.highlightHeader}>
            <Text style={styles.highlightLabel}>CO2e Tracked</Text>
            <FontAwesome5 name="question-circle" size={16} color="#34495e" />
          </View>
          <Text style={styles.highlightValue}>
            0 kg <FontAwesome5 name="thumbtack" size={16} color="black" />
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
            <Text style={styles.highlightLabel}>Tracking Streak</Text>
            <FontAwesome5 name="question-circle" size={16} color="#34495e" />
          </View>
          <Text style={styles.highlightValue}>
            0 Days <FontAwesome5 name="fire" size={16} color="black" />
          </Text>
        </View>
      </View>
      <View style={styles.trendsHeader}>
        <Text style={styles.trendsText}>Trends</Text>
        <Text style={styles.trendsMore}>What's this?</Text>
      </View>
      <View style={styles.trends}>
        <View style={styles.trendBox}>
          <View style={styles.trendHeader}>
            <Text style={styles.trendLabel}>Daily Emissions</Text>
            <FontAwesome5 name="info-circle" size={16} color="#34495e" />
          </View>
          <Text style={styles.trendSubtitle}>Last 7 days</Text>
          <Text style={styles.trendValue}>0 kg</Text>
          <Text style={styles.trendSubtitle}>Avg CO2e</Text>
          <View style={styles.trendChart}>
            {dailyEmissions.map((value, index) => (
              <View
                key={index}
                style={[styles.trendBar, { height: value * 50 }]} // Adjust the multiplier as needed
              ></View>
            ))}
          </View>
          <View style={styles.trendDays}>
            <Text style={styles.trendDay}>M</Text>
            <Text style={styles.trendDay}>T</Text>
            <Text style={styles.trendDay}>W</Text>
            <Text style={styles.trendDay}>T</Text>
            <Text style={styles.trendDay}>F</Text>
            <Text style={styles.trendDay}>S</Text>
            <Text style={styles.trendDay}>S</Text>
          </View>
        </View>
        <View style={styles.trendBox}>
          <View style={styles.trendHeader}>
            <Text style={styles.trendLabel}>Weekly Goals</Text>
            <FontAwesome5 name="info-circle" size={16} color="#34495e" />
          </View>
          <Text style={styles.trendSubtitle}>Last 7 days</Text>
          <Text style={styles.trendValue}>0/7</Text>
          <Text style={styles.trendSubtitle}>Achieved</Text>
          <View style={styles.trendCircles}>
            {weeklyGoals.map((value, index) => (
              <Svg height="30" width="30" key={index}>
                <G rotation="-90" origin="15, 15">
                  <Circle
                    cx="15"
                    cy="15"
                    r="13"
                    stroke="#bdc3c7"
                    strokeWidth="2"
                    fill="none"
                  />
                  <Circle
                    cx="15"
                    cy="15"
                    r="13"
                    stroke="#10ac84"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${(value * 2 * Math.PI * 13) / 100}, ${
                      2 * Math.PI * 13
                    }`}
                  />
                  <SvgText
                    x="15"
                    y="18"
                    fontSize="12"
                    fill="black"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {value}%
                  </SvgText>
                </G>
              </Svg>
            ))}
          </View>
          <View style={styles.trendDays}>
            <Text style={styles.trendDay}>M</Text>
            <Text style={styles.trendDay}>T</Text>
            <Text style={styles.trendDay}>W</Text>
            <Text style={styles.trendDay}>T</Text>
            <Text style={styles.trendDay}>F</Text>
            <Text style={styles.trendDay}>S</Text>
            <Text style={styles.trendDay}>S</Text>
          </View>
        </View>
      </View>
      <AchievementsRecentProducts/>
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
  },
  trendBox: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
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
  trendChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
    height: 50,
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
