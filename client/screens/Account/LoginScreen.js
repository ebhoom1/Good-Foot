import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import CustomButton from '../../components/Button/CustomButton';
import GoogleButton from '../../components/Button/GoogleButton';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { API_URL } from '../../util/api';

const googleClientIds = Constants.manifest?.extra || {};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Check if user is already logged in when the component mounts
  useEffect(() => {
    checkLoggedIn();
  }, []);

  // Google Auth Request setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: googleClientIds.expoClientId || 'YOUR_FALLBACK_EXPO_CLIENT_ID',
    iosClientId: googleClientIds.iosClientId || 'YOUR_FALLBACK_IOS_CLIENT_ID',
    androidClientId: googleClientIds.androidClientId || 'YOUR_FALLBACK_ANDROID_CLIENT_ID',
  });

  // Check if user is already logged in
  const checkLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        // If token exists, navigate to the MainTabs (Dashboard)
        navigation.navigate('MainTabs');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  // Handle Google login response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      // Send the Google token to the backend for verification and login
      axios.post('http://192.168.20.4:4444/api/users/google-login', {
        token: authentication.accessToken,
        platform: Platform.OS // Send platform to backend (ios or android)
      })
      .then(async (res) => {
        if (res.data.success) {
          console.log('User logged in with Google:', res.data);
          await AsyncStorage.setItem('userToken', res.data.token); // Save token to AsyncStorage
          navigation.navigate('MainTabs'); // Navigate to the dashboard after successful Google login
        } else {
          console.log('Error:', res.data.message);
        }
      })
      .catch((error) => {
        console.error('Error logging in with Google:', error);
      });
    }
  }, [response]);

  // Handle manual login with email and password
  const handleLogin = () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    axios.post(`${API_URL}/api/users/login`, {
      email,
      password
    })
    .then(async (res) => {
      if (res.data.success) {
        console.log('User logged in:', res.data);
        await AsyncStorage.setItem('userToken', res.data.token); // Save token to AsyncStorage
        navigation.navigate('MainTabs'); // Navigate to the dashboard after successful manual login
      } else {
        alert('Login failed: ' + res.data.message);
      }
    })
    .catch((error) => {
      console.error('Error logging in:', error);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
        >
          <GoogleButton onPress={() => promptAsync()} />

          <Text style={styles.title}>Log In</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="done"
          />

          <CustomButton onPress={handleLogin}>Log In</CustomButton>

          {/* <View style={styles.footer}>
            <Text style={styles.newUserText}>New user?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text style={styles.createAccountText}>Create an account</Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  newUserText: {
    fontSize: 16,
    color: '#666',
  },
  createAccountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginVertical: 10,
  },
});
