import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '../../components/Button/IconButton';

const ResultScreen = ({ route, navigation }) => {
  const { totalCarbonFootprint } = route.params;

  const confirmed = () => {
    navigation.navigate('MainTabs');
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Result</Text>
          </View>
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Meet your personal carbon footprint:</Text>
            <Text style={styles.resultValue}>{totalCarbonFootprint}</Text>
            <Text style={styles.resultUnit}>Kg CO₂e</Text>
          </View>
          <View style={styles.compareContainer}>
            <Text style={styles.compareText}>How do you compare?</Text>
            <View style={styles.compareBar}>
              <Text style={styles.compareLabel}>You</Text>
              <View style={styles.bar}>
                <View style={[styles.barFill, { width: '50%', backgroundColor: 'lightgreen' }]} />
              </View>
              <Text style={styles.compareValue}>{totalCarbonFootprint} Tons</Text>
            </View>
            <View style={styles.compareBar}>
              <Text style={styles.compareLabel}>Avg India</Text>
              <View style={styles.bar}>
                <View style={[styles.barFill, { width: '50%', backgroundColor: 'dodgerblue' }]} />
              </View>
              <Text style={styles.compareValue}>2.33 Tons</Text>
            </View>
            <View style={styles.compareBar}>
              <Text style={styles.compareLabel}>Avg World</Text>
              <View style={styles.bar}>
                <View style={[styles.barFill, { width: '100%', backgroundColor: 'blue' }]} />
              </View>
              <Text style={styles.compareValue}>4.5 Tons</Text>
            </View>
          </View>
          <View style={styles.graphContainer}>
            <Text style={styles.graphTitle}>Understand your footprint</Text>
            <View style={styles.graph}>
              <View style={styles.graphBar}>
                <Text style={styles.graphLabel}>Flying</Text>
                <View style={[styles.graphBarFill, { height: 10 }]} />
                <Text style={styles.graphValue}>0.1T</Text>
              </View>
              <View style={styles.graphBar}>
                <Text style={styles.graphLabel}>Mobility</Text>
                <View style={[styles.graphBarFill, { height: 50 }]} />
                <Text style={styles.graphValue}>0.5T</Text>
              </View>
              <View style={styles.graphBar}>
                <Text style={styles.graphLabel}>Housing</Text>
                <View style={[styles.graphBarFill, { height: 70 }]} />
                <Text style={styles.graphValue}>0.7T</Text>
              </View>
              <View style={styles.graphBar}>
                <Text style={styles.graphLabel}>Diet</Text>
                <View style={[styles.graphBarFill, { height: 40 }]} />
                <Text style={styles.graphValue}>0.4T</Text>
              </View>
              <View style={styles.graphBar}>
                <Text style={styles.graphLabel}>Spending</Text>
                <View style={[styles.graphBarFill, { height: 40 }]} />
                <Text style={styles.graphValue}>0.4T</Text>
              </View>
            </View>
          </View>
          <View style={styles.moreOptions}>
            <Text style={styles.moreOptionsTitle}>More options</Text>
            <TouchableOpacity style={styles.optionCard} >
              <Ionicons name="options-sharp" size={24} color="dodgerblue" />
              <Text style={styles.optionText}>Needs fine tuning? Edit your footprint in greater detail.</Text>
              <Ionicons name="chevron-forward-sharp" size={24} color="dodgerblue" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionCard} >
              <Ionicons name="refresh-sharp" size={24} color="dodgerblue" />
              <Text style={styles.optionText}>Reset all questions and restart the calculator.</Text>
              <Ionicons name="chevron-forward-sharp" size={24} color="dodgerblue" />
            </TouchableOpacity>
          </View>
          <IconButton icon="checkmark-sharp" size={24} color="white" onPress={confirmed}/>
        </ScrollView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop:20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
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
    fontSize: 16,
    textAlign: 'center',
  },
  resultValue: {
    color: 'black',
    fontSize: 48,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  resultUnit: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  compareContainer: {
    width: '100%',
    marginVertical: 20,
  },
  compareText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  compareBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  compareLabel: {
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
  bar: {
    flex: 4,
    height: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
  },
  compareValue: {
    color: 'white',
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
  graphContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  graphTitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  graph: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  graphBar: {
    alignItems: 'center',
  },
  graphLabel: {
    color: 'white',
    fontSize: 12,
    marginBottom: 5,
  },
  graphBarFill: {
    width: 20,
    backgroundColor: 'dodgerblue',
    borderRadius: 5,
  },
  graphValue: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  moreOptions: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  moreOptionsTitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  optionText: {
    color: 'white',
    fontSize: 14,
    flex: 1,
    marginHorizontal: 10,
  },
});

export default ResultScreen;
