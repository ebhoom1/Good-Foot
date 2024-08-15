import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

const FormUI = ({ children, showCloseButton = false }) => {
  const [isVisible, setIsVisible] = useState(true); // Control whether the form is displayed
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handleClose = () => {
    // Start the animations
    opacity.value = withTiming(0, {
      duration: 300,
      easing: Easing.in(Easing.ease),
    });
    scale.value = withTiming(0.8, {
      duration: 300,
      easing: Easing.in(Easing.ease),
    }, () => {
      runOnJS(setIsVisible)(false); // Remove the form only after the animation completes
    });
  };

  // Render the component only if it's visible
  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.formContainer, animatedStyle]}>
      {showCloseButton && (
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      )}
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default FormUI;
