import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, Button, Image, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../../util/api';

const EditProfileModal = ({ isVisible, onClose, userData, onSave }) => {
  const [profileImage, setProfileImage] = useState(userData.profileImage || 'https://via.placeholder.com/150');
  const [imageKey, setImageKey] = useState(new Date().toISOString()); // key to force re-render
  const [address, setAddress] = useState(userData.address || {});
  const [email, setEmail] = useState(userData.email || '');
  const [phone, setPhone] = useState(userData.phone || '');

  useEffect(() => {
    setProfileImage(userData.profileImage || 'https://via.placeholder.com/150');
    setAddress(userData.address || {});
    setEmail(userData.email || '');
    setPhone(userData.phone || '');
    setImageKey(new Date().toISOString());
  }, [userData]);

  const verifyPermissions = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant camera permissions to use this feature.');
      return false;
    }
    return true;
  };

  const handlePickImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
      setImageKey(new Date().toISOString()); // update key to force image re-render
    }
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const formData = new FormData();
      formData.append('profileImage', { uri: profileImage, type: 'image/jpeg', name: 'profile.jpg' });
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('address', JSON.stringify(address));

      const config = { headers: {  'Content-Type': 'multipart/form-data' } };
      const response = await axios.patch(`${API_URL}/api/users/edit-profile/${userData.username}`, formData, config);

      console.log('Server response:', response.data); // Add logging to check server response

      onSave(response.data.user); // Update user data on AccountScreen
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error); // Log errors
      Alert.alert('Update Failed', 'Could not update profile.');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={handlePickImage}>
              <Image source={{ uri: profileImage }} key={imageKey} style={styles.profileImage} />
            </TouchableOpacity>

            {/* Inputs for Email and Phone */}
            <View style={styles.inputRow}>
              <TextInput style={styles.inputHalf} placeholder="Email" value={email} onChangeText={setEmail} placeholderTextColor="black" />
              <TextInput style={styles.inputHalf} placeholder="Phone" value={phone} onChangeText={setPhone} placeholderTextColor="black" />
            </View>

            {/* Address Inputs */}
            <TextInput style={styles.input} placeholder="Street" value={address.street || ''} onChangeText={(text) => setAddress({ ...address, street: text })} placeholderTextColor="black" />
            <TextInput style={styles.input} placeholder="City" value={address.city || ''} onChangeText={(text) => setAddress({ ...address, city: text })} placeholderTextColor="black" />
            <TextInput style={styles.input} placeholder="State" value={address.state || ''} onChangeText={(text) => setAddress({ ...address, state: text })} placeholderTextColor="black" />
            <TextInput style={styles.input} placeholder="Postal Code" value={address.postalCode || ''} onChangeText={(text) => setAddress({ ...address, postalCode: text })} placeholderTextColor="black" />

            {/* Buttons for Save and Cancel */}
            <View style={styles.buttonContainer}>
              <Button title="Save" onPress={handleSave} color="#007bff" />
              <Button title="Cancel" onPress={onClose} color="#ff3b30" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 40,
    backgroundColor: 'white',
    flex: 1,
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  changePhotoText: {
    textAlign: 'center',
    color: '#007bff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
    placeholderTextColor: 'black',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '48%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});

export default EditProfileModal;
