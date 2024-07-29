import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { ecoChallengesData } from '../../util/dummyData'; // Import the dummy data

const { width, height } = Dimensions.get('window');

const EcoChallengesScreen = () => {
  const [currentChallenge, setCurrentChallenge] = useState(null);

  const handleChallengePress = (index) => {
    setCurrentChallenge(index);
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/tree.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />
      <ScrollView contentContainerStyle={styles.mapContainer}>
        {ecoChallengesData.map((challenge, index) => {
          const isLeft = index % 2 === 0;
          const topPosition = (index % 2 === 0 ? index * 160 : index * 160 + 30);
          const leftPosition = isLeft ? 50 : width - 150;

          return (
            <View key={challenge.id} style={[styles.challengeWrapper, { top: topPosition, left: leftPosition }]}>
              <TouchableOpacity onPress={() => handleChallengePress(index)} style={styles.challengeContainer}>
                <Image source={challenge.image} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.challengeTitle}>{`Level ${index + 1}`}</Text>
                  {currentChallenge === index && (
                    <>
                      <Text style={styles.challengeTitle}>{challenge.title}</Text>
                      <Text style={styles.challengeDescription}>{challenge.description}</Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
              {index < ecoChallengesData.length - 1 && (
                <View style={styles.connector}>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A2E1A1',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  mapContainer: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: height * 2, // Ensure enough space for scrolling
  },
  challengeWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  challengeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    width: width * 0.3,
    alignItems: 'center',
    elevation: 10,
    paddingBottom: 10, 
    
  },
  image: {
    width: '100%',
    height: 100,
  },
  textContainer: {
    padding: 10,
    alignItems: 'center',
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  challengeDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  connector: {
    alignItems: 'center',
    marginTop: -20,
  },
  line: {
    width: 2,
    height: 40,
    backgroundColor: '#333',
    borderStyle: 'dotted',
    borderWidth: 1,
  },
});

export default EcoChallengesScreen;
