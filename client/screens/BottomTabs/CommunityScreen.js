// screens/BottomTabs/CommunityScreen.js
import React, { useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommunityScreen = ({ navigation }) => {
  const scrollViewRef = useRef(null);

  const scrollToSection = (section) => {
    const yOffset = section === 'Common friends' ? 0 :
                    section === 'Community' ? Dimensions.get('window').height * 0.5 :
                    section === 'Near me' ? Dimensions.get('window').height :
                    Dimensions.get('window').height * 1.5;
    scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
  };

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <Ionicons name="person-sharp" size={24} color="white" style={{ marginRight: 15 }} />
        </TouchableOpacity>
      </View>
      <Text style={styles.greeting}>Hi User! 👋</Text>
      <ImageBackground
        source={{ uri: 'https://path-to-your-background-image.jpg' }}
        style={styles.backgroundImage}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.mealPlanner}>
          <Text style={styles.mealPlannerTitle}>Community Planner Task⚡</Text>
          <Text style={styles.mealPlannerSubtitle}>Complete Task and earn points now</Text>
          <TouchableOpacity style={styles.tryNowButton}>
            <Text style={styles.tryNowButtonText}>Try it now</Text>
            <Ionicons name="arrow-forward-sharp" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.recipesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.recipeItem} onPress={() => scrollToSection('Common friends')}>
            <Text style={styles.recipeText}>Common friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recipeItem} onPress={() => scrollToSection('Community')}>
            <Text style={styles.recipeText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recipeItem} onPress={() => scrollToSection('Near me')}>
            <Text style={styles.recipeText}>Near me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recipeItem} onPress={() => scrollToSection('Verified accounts')}>
            <Text style={styles.recipeText}>Verified accounts</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Common friends section */}
      <View style={styles.chefsContainer}>
        <Text style={styles.featuredChefsTitle}>Common friends</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chefsRow}>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>Vimarsh Patel</Text>
                <Text style={styles.chefUsername}>@amateurprochef</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>Remi Idowu</Text>
                <Text style={styles.chefUsername}>@foodbyremi</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>John Doe</Text>
                <Text style={styles.chefUsername}>@johnchef</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>Jane Smith</Text>
                <Text style={styles.chefUsername}>@janechef</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
        </ScrollView>
      </View>

      {/* Community section */}
      <View style={styles.chefsContainer}>
        <Text style={styles.featuredChefsTitle}>Community</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chefsRow}>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>community 1</Text>
                <Text style={styles.chefUsername}>@amateurprochef</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>Remi Idowu</Text>
                <Text style={styles.chefUsername}>@foodbyremi</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>John Doe</Text>
                <Text style={styles.chefUsername}>@johnchef</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/3830752/pexels-photo-3830752.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>Jane Smith</Text>
                <Text style={styles.chefUsername}>@janechef</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
        </ScrollView>
      </View>

      {/* Near me section */}
      <View style={styles.chefsContainer}>
        <Text style={styles.featuredChefsTitle}>Near me</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chefsRow}>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>Vimarsh Patel</Text>
                <Text style={styles.chefUsername}>@amateurprochef</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>Remi Idowu</Text>
                <Text style={styles.chefUsername}>@foodbyremi</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>John Doe</Text>
                <Text style={styles.chefUsername}>@johnchef</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>Jane Smith</Text>
                <Text style={styles.chefUsername}>@janechef</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
        </ScrollView>
      </View>

      {/* Verified accounts section */}
      <View style={styles.chefsContainer}>
        <Text style={styles.featuredChefsTitle}>Verified accounts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chefsRow}>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>Vimarsh Patel</Text>
                <Text style={styles.chefUsername}>@amateurprochef</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>Remi Idowu</Text>
                <Text style={styles.chefUsername}>@foodbyremi</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>John Doe</Text>
                <Text style={styles.chefUsername}>@johnchef</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.chefCard}>
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.chefImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.chefOverlay}>
                <Text style={styles.chefName}>Jane Smith</Text>
                <Text style={styles.chefUsername}>@janechef</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
    backgroundColor: '#0c7403',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  backgroundImage: {
    width: '90%',
    height: Dimensions.get('window').height * 0.3,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mealPlanner: {
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  mealPlannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  mealPlannerSubtitle: {
    fontSize: 16,
    color: 'white',
    marginVertical: 10,
  },
  tryNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00C853',
    padding: 10,
    borderRadius: 5,
  },
  tryNowButtonText: {
    color: 'white',
    marginRight: 5,
  },
  recipesContainer: {
    marginVertical: 20,
    paddingLeft: 20,
  },
  recipeItem: {
    marginRight: 10,
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 50,
  },
  recipeText: {
    fontSize: 14,
    color: '#555',
  },
  chefsContainer: {
    paddingHorizontal: 20,
  },
  featuredChefsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chefsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  chefCard: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').height * 0.25,
    margin:5,
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  chefImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  chefOverlay: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  chefName: {
    color: 'white',
    fontWeight: 'bold',
  },
  chefUsername: {
    color: 'white',
  },
  searchContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchTitle: {
    fontSize: 18,
    flex: 1,
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#00C853',
    borderRadius: 5,
  },
});

export default CommunityScreen;
