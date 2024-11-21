import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Dimensions, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { API_URL } from '../../../util/api';

const { width, height } = Dimensions.get('window');

const EcoChallengesMonth = ({ navigation }) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the user token and fetch user details
        const userToken = await AsyncStorage.getItem('userToken');
        const userResponse = await axios.get(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${userToken}` }
        });

        // Get the monthly challenges
        const challengeResponse = await axios.get(`${API_URL}/api/eco-challenges/month`);
        if (challengeResponse.data) {
          setChallenges(challengeResponse.data);
        }

        // Set user points from the response
        if (userResponse.data && userResponse.data.totalPoints) {
          setPoints(userResponse.data.totalPoints);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#3aa04e" />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/Eco-challenges/eco-challenge-background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.header}>
        <Progress.Circle
          size={50}
          progress={points / 100}
          showsText={true}
          color={'#3aa04e'}
          style={styles.progressCircle}
          formatText={() => `${points}%`}
        />
        <Text style={styles.pointsText}>Total Points: {points}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.mapContainer}>
        {challenges.map((challenge, index) => {
          const isLeft = index % 2 === 0;
          const topPosition = index * 140 + (isLeft ? 0 : 30);
          const leftPosition = isLeft ? 40 : width - 140;
          return (
            <TouchableOpacity
              key={challenge._id}
              style={{ position: 'absolute', top: topPosition, left: leftPosition }}
              onPress={() => navigation.navigate('TaskDetails', challenge)}
            >
              <View style={styles.circle}>
                <Text style={styles.text}>{challenge.taskNo}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#A2E1A1' },
  backgroundImage: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '100%' },
  header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 40, paddingBottom:20, backgroundColor: "black", zIndex: 1 },
  progressCircle: { alignSelf: 'center' },
  pointsText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  mapContainer: { alignItems: 'center', paddingTop: 80, paddingBottom: height * 1.30, marginTop: 10 },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderWidth: 5,
    borderColor: 'white',
    marginTop: 40,
  },
  text: { color: 'white', fontWeight: 'bold', fontSize: 30 },
});

export default EcoChallengesMonth;
