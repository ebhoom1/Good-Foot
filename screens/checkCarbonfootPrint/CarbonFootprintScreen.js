import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Video } from 'expo-av';
import CustomButton from '../../components/Button/CustomButton';

export default function CarbonFootprintScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/VideoBackground1.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Calculate Carbon Footprint</Text>
        <CustomButton onPress={() => navigation.navigate('Confirm')}>
          Calculate your footprint
        </CustomButton>
        
        <View style={styles.footer}>
          <Text style={styles.memberText}>Already a Member</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Log in</Text>
          </Pressable>
        </View>
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
  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  memberText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
