import React from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

class AnimatedText extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),
  };

  componentDidMount() {
    const { delay } = this.props;
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000,
      delay,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { children } = this.props;
    const { fadeAnim } = this.state;

    return (
      <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
        <Text style={styles.text}>{children}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    color: 'black',
    textAlign: 'left',
    padding: 10,
  },
});

export default AnimatedText;
