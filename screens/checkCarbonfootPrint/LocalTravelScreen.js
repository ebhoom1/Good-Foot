import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import Card from '../../components/UI/Card';
import AnimatedText from '../../components/UI/AnimatedText';
import IconButton from '../../components/Button/IconButton'; // Assuming you have an IconButton component
import RadioButton from '../../components/Button/RadioButton'; // Assuming you have a RadioButton component

const LocalTravelScreen = ({ navigation, route }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const confirmed = () => {
    navigation.navigate('Result');
  }


  const options = [
    { label: "😇I don't drive or ride", value: 'rarely' },
    { label: '🚕 Up to 5000 km', value: 'occasionally' },
    { label: '🚗 5000 - 10,000 km', value: 'regularly' },
    { label: '🚘 10,000 - 15000 km', value: 'custom' },
  ];
  
 
  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/localTravel.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />
      <View style={styles.overlay}>
        <View style={styles.animatedTextContainer}>
          <AnimatedText delay={500}>
            <Text style={styles.text}>3.33</Text>
            <Text style={styles.text}> Tons CO²e</Text>
          </AnimatedText>
        </View>
      
        <View style={styles.cardsContainer}>
          <Card 
            delay={500}
            content="How much do you get around by car annually?"
          />
          
        </View>
        
        <View style={styles.radioButtonContainer}>
          {options.map(option => (
            <RadioButton
              key={option.value}
              label={option.label}
              value={option.value}
              checked={selectedOption === option.value}
              onPress={() => setSelectedOption(option.value)}
            />
          ))}
        </View>

        {selectedOption && (
          <View style={styles.buttonContainer}>
            <IconButton 
              icon="arrow-forward"  
              size={24}
              color="white"
              onPress={confirmed}
            />
          </View>
        )}
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  animatedTextContainer: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
  },
  cardsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  radioButtonContainer: {
    width: '100%',
    padding: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LocalTravelScreen;
