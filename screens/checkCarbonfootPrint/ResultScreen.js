import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import Card from '../../components/UI/Card';
import AnimatedText from '../../components/UI/AnimatedText';
import IconButton from '../../components/Button/IconButton'; // Assuming you have an IconButton component

const ResultScreen = ({ navigation, route }) => {
  const confirmed = () => {
    navigation.navigate('MainTabs'); // Replace 'NextScreen' with your actual next screen name
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/result.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />
      <View style={styles.overlay}>
        <View style={styles.animatedTextContainer}>
          <AnimatedText delay={500}>
            <Text style={styles.text}>Result</Text>
          </AnimatedText>
        </View>
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Your carbon consumption up to now</Text>
          <Text style={styles.resultValue}>10.88 Ton CO²e</Text>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton 
            icon="arrow-forward"  
            size={24}
            color="white"
            onPress={confirmed}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  animatedTextContainer: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
  },
  resultBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  resultText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  resultValue: {
    color: 'black',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ResultScreen;
