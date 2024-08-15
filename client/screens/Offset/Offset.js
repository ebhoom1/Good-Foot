
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const Offset = ({ navigation }) => {
    const confirm =()=>{
        navigation.navigate('Offset-Project')
    }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.background}>
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
        <View style={styles.header}>
          
        </View>
        <View style={styles.overlay}>
          <Text style={styles.greeting}>👋 Hi, User</Text>
          <Text style={styles.carbonFootprint}>Let’s neutralise your 3.96 ton carbon footprint!</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={confirm}>
          <Text style={styles.buttonText}>Start offsetting</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.projectsSection}>
        <Text style={styles.sectionTitle}>Our projects</Text>
        <Text style={styles.sectionSubtitle}>Meet GoodFoot climate projects.</Text>
        <ScrollView horizontal style={styles.projectsScrollView}>
          <ImageBackground
            source={{ uri: 'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=600' }}
            style={styles.projectCard}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={styles.projectCardOverlay}>
              <Text style={styles.projectTitle}>Panama Reforestation Project</Text>
              <Text style={styles.projectStandard}>Gold Standard</Text>
            </View>
          </ImageBackground>
          <ImageBackground
            source={{ uri: 'https://images.pexels.com/photos/27351160/pexels-photo-27351160/free-photo-of-view-on-the-bay.jpeg?auto=compress&cs=tinysrgb&w=600' }}
            style={styles.projectCard}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={styles.projectCardOverlay}>
              <Text style={styles.projectTitle}>Mauritania Project</Text>
              <Text style={styles.projectStandard}>Verified Carbon Standard</Text>
            </View>
          </ImageBackground>
          {/* Add more project cards here */}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: Dimensions.get('window').height * 0.5,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  carbonFootprint: {
    fontSize: 20,
    color: 'white',
    marginVertical: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: -35, // Adjust to place half of the button over the video section
    zIndex: 1,
  },
  button: {
    width: '80%',
    paddingVertical: 25,
    backgroundColor: '#00C853',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  projectsSection: {
    paddingTop: 70, // Adjust to ensure there's space for the button overlay
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: 'gray',
  },
  projectsScrollView: {
    marginTop: 10,
  },
  projectCard: {
    width: Dimensions.get('window').width * 0.8,
    height: 200,
    marginRight: 10,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  projectCardOverlay: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  projectStandard: {
    fontSize: 14,
    color: 'white',
  },
});

export default Offset;