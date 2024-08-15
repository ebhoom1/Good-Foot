import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import Card from '../../components/UI/Card';
import AnimatedText from '../../components/UI/AnimatedText';
import IconButton from '../../components/Button/IconButton'; // Assuming you have an IconButton component
import RadioButton from '../../components/Button/RadioButton'; // Assuming you have a RadioButton component

const FoodScreen = ({ navigation, route }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const confirmed = () => {
    navigation.navigate('Localtravel');
  }


  const options = [
    { label: '🥑 Vegan', value: 'rarely' },
    { label: ' 🧀 Vegetarian', value: 'occasionally' },
    { label: ' 🍕I try to eat less meat', value: 'regularly' },
    { label: ' 🥩I eat everything', value: 'custom' },
  ];
  
 
  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/food.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />
      <View style={styles.overlay}>
        <View style={styles.animatedTextContainer}>
          <AnimatedText delay={500}>
            <Text style={styles.text}>5.18</Text>
            <Text style={styles.text}> Tons CO²e</Text>
          </AnimatedText>
        </View>
      
        <View style={styles.cardsContainer}>
          <Card 
            delay={500}
            content="Which best decribes your diet?"
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

export default FoodScreen;