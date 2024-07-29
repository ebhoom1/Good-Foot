import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Video } from 'expo-av';
import Card from '../../components/UI/Card';
import AnimatedText from '../../components/UI/AnimatedText';
import IconButton from '../../components/Button/IconButton';  // Assuming you have an IconButton component

const DetailScreen = ({ navigation, route }) => {
  const { country, carbonFootprint, additionalInfo } = route.params;

  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/VideoBackground1.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        shouldPlay
        isLooping
      />
      <View style={styles.overlay}>
      <View style={styles.animatedTextContainer}>
     
           <Text style={styles.text}>{carbonFootprint}</Text>
           <Text style={styles.text}> Ton CO²e</Text>
          
        
       
        </View>
        <View style={styles.container}>
      <Text style={styles.text}>{`Country: ${country ? country.name : 'None selected'}`}</Text>
    </View>
      
        <View style={styles.cardsContainer}>
          <Card 
            delay={500}
            content="Okey, let's figure out what your personal carbon footprint looks like! 😊"
          />
          <Card 
            delay={1000}
            content={`On the top you see the average, annual ${country} footprint.`}
          />
          <Card 
            delay={1500}
            content="Keep an eye on it. It will turn into your personal footprint as you answer questions!"
          />
        </View>

        <View style={styles.buttonContainer}>
          <IconButton 
            icon="arrow-forward"  
            onPress={() => navigation.navigate('Travel')}  
            title="Next"
            size={24}
            color="white"
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  animatedTextContainer: {
    position: 'absolute',
    top: 50,
  },
  cardsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 28,
    textAlign:'center',
    fontWeight:'bold'
  },
});

export default DetailScreen;
