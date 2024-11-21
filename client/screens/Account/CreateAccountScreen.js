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
  Platform
} from 'react-native';
import axios from 'axios'; // Add Axios
import CustomButton from '../../components/Button/CustomButton';
import GoogleButton from '../../components/Button/GoogleButton';
import Constants from 'expo-constants';
import * as Google from 'expo-auth-session/providers/google';
import { API_URL } from '../../util/api';

const googleClientIds = Constants.manifest?.extra || {};

export default function CreateAccountScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  // Google Auth Request setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: googleClientIds.expoClientId || 'YOUR_FALLBACK_EXPO_CLIENT_ID',
    iosClientId: googleClientIds.iosClientId || 'YOUR_FALLBACK_IOS_CLIENT_ID',
    androidClientId: googleClientIds.androidClientId || 'YOUR_FALLBACK_ANDROID_CLIENT_ID',
  });

  // Handle Google login response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      axios.post(`${API_URL}/api/users/google-login`, {
        token: authentication.accessToken,
        platform: Platform.OS
      })
        .then((res) => {
          if (res.data.success) {
            console.log('User logged in with Google:', res.data);
          } else {
            console.log('Error:', res.data.message);
          }
        })
        .catch((error) => console.error('Error logging in with Google:', error));
    }
  }, [response]);

  const handleCreateAccount = () => {
    // Check password length
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    axios.post('http://192.168.20.4:4444/api/users/register', {
      username,
      email,
      password,
    })
      .then((res) => {
        if (res.data.success) {
          console.log('User registered:', res.data);
          alert('Account created successfully!');  // Optional success message
          navigation.navigate('Login'); // Navigate to the Login screen
        } else {
          alert('Registration failed: ' + res.data.message);
        }
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <GoogleButton onPress={() => promptAsync()} />

        <Text style={styles.title}>Create Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
       
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <CustomButton onPress={handleCreateAccount}>Create Account</CustomButton>

        <View style={styles.footer}>
          <Text style={styles.existingUserText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
            <Text style={styles.loginText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  existingUserText: {
    fontSize: 16,
    color: '#666',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginVertical: 10,
  },
});
