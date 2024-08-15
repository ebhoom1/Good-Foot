import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Video } from 'expo-av';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/VideoBackground.mp4')} 
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay}>
        <Pressable style={styles.tapToStart} onPress={() => navigation.navigate('CarbonFootprint')}>
          <Text style={styles.tapToStartText}>Tap to start</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tapToStart: {
    position: 'absolute',
    bottom: 40,
    padding: 20,
    fontWeight:'bold',
    backgroundColor:'green',
    borderRadius:20,
    
  },
  tapToStartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
