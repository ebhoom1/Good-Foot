import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Dimensions, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../util/api';

const { width, height } = Dimensions.get('window');

const EcoChallengesWeek = ({ navigation }) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const userResponse = await axios.get(`${API_URL}/api/users/me`, config);
        const challengeResponse = await axios.get(`${API_URL}/api/eco-challenges/week`);

        const storedProfileImage = await AsyncStorage.getItem('profileImage');

        if (userResponse.data && userResponse.data.user) {
          setPoints(userResponse.data.user.totalPoints);
        }
        if (challengeResponse.data) {
          setChallenges(challengeResponse.data);
        }

        if (storedProfileImage) {
          setProfileImage(storedProfileImage);
        } else {
          setProfileImage(null);  // Fallback to null if no image found
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
    return <ActivityIndicator size="large" color="#fbb606" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image
        source={require('../../../assets/Eco-challenges/eco-challenge-background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Progress.Circle
            size={80}
            progress={points / 100}
            showsText={true}
            thickness={17}
            color={'#fbb606'}
            style={styles.progressCircle}
            formatText={() => `${points}%`}
          >
            {/* Profile image or default avatar inside progress circle */}
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require('../../../assets/profile.jpg')}
                style={styles.profileImage}
              />
            )}
          </Progress.Circle>
        </View>
        <View style={styles.mapContainer}>
          {challenges.map((task, index) => {
            const isLeft = index % 2 === 0;
            const topPosition = index * 140;
            const leftPosition = isLeft ? 40 : width - 140;

            return (
              <TouchableOpacity
                key={task._id}
                style={{ position: 'absolute', top: topPosition, left: leftPosition }}
                onPress={() => navigation.navigate('TaskDetails', task)}
              >
                <View style={styles.circle}>
                  <Text style={styles.text}>{task.taskNo}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: { 
    flex: 1, 
    backgroundColor: 'transparent',
    position: 'relative',
  },
  backgroundImage: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    bottom: 0, 
    right: 0, 
    width: '100%', 
    height: height * 2,  // Make sure the image is tall enough to cover the scrollable content
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: 40, 
    paddingBottom: 20, 
    backgroundColor: "transparent", 
    zIndex: 1 
  },
  progressCircle: { 
    alignSelf: 'center', 
  },
  pointsText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginLeft: 10 
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Makes the image circular
    position: 'absolute', // Ensures it stays inside the progress circle
    top: 15,
    left: 15,
  },
  mapContainer: { 
    alignItems: 'center', 
    paddingTop: 80, 
    paddingBottom: height * 1.30, 
    marginTop: 10 
  },
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
  text: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 30 
  },
});

export default EcoChallengesWeek;
