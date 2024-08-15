import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import AnimatedText from './AnimatedText';

const Card = ({ content, delay }) => {
  const translateY = useSharedValue(50); // Initial position off the screen to the bottom
  const opacity = useSharedValue(0); // Initial opacity

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 1500,
      delay: delay,
      easing: Easing.out(Easing.ease),
    });

    opacity.value = withTiming(1, {
      duration: 1500,
      delay: delay,
      easing: Easing.out(Easing.ease),
    });
  }, [delay, translateY, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <AnimatedText delay={delay}>{content}</AnimatedText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 10,
  },
});

export default Card;
