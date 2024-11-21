import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, KeyboardAvoidingView, Dimensions, Platform,Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import TaskInfo from './Task/TaskInfo';
import Timer from './Task/Timer';
import ImageUploader from './Task/ImageUploader';
import DescriptionInput from './Task/DescriptionInput';
import StartButton from './Task/StartButton';
import DoneButton from './Task/DoneButton';
import { saveImagesToLocalStorage } from '../../../util/AsyncStorage';
import { API_URL } from '../../../util/api';

const { width, height } = Dimensions.get('window');

const TaskDetails = ({ route, navigation }) => {
  const { taskNo, name, image, challenge, benefitsToSociety, timeline, points, carbonEmission, requiredImage, _id } = route.params || {};
  const [timeLeft, setTimeLeft] = useState(0);
  const [images, setImages] = useState([]);
  const [uploadCount, setUploadCount] = useState(0);
  const [taskStarted, setTaskStarted] = useState(false);
  const [imageDescription, setImageDescription] = useState('');
  const [userId, setUserId] = useState('');

  const imageUrl = image.startsWith('http') ? image : `${API_URL}${image}`;

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        Alert.alert('Error', 'User not found. Please log in again.');
      }
    };
    fetchUserId();
  }, []);

  const convertTimelineToHours = (timeline) => {
    if (timeline.toLowerCase().includes('week')) {
      const weeks = parseInt(timeline.split(' ')[0], 10);
      return weeks * 7 * 24;
    } else if (timeline.toLowerCase().includes('month')) {
      const months = parseInt(timeline.split(' ')[0], 10);
      return months * 30 * 24;
    }
    return 0;
  };

  useEffect(() => {
    let interval;
    if (taskStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [taskStarted, timeLeft]);

  const startTask = () => {
    const totalHours = convertTimelineToHours(timeline);
    setTimeLeft(totalHours * 3600);
    setTaskStarted(true);
  };



  const pickImage = async () => {
    if (uploadCount >= requiredImage) {
      Alert.alert('Limit Reached', `You can only upload ${requiredImage} images.`);
      return;
    }

    const { status: mediaLibraryStatus } = await ImagePicker.getMediaLibraryPermissionsAsync();
const { status: cameraStatus } = await ImagePicker.getCameraPermissionsAsync();


    if (mediaLibraryStatus !== 'granted' || cameraStatus !== 'granted') {
      Alert.alert('Permission Denied', 'Please enable camera and media library access.');
      return;
    }

    Alert.alert(
      'Upload Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
            });
            if (!result.canceled && result.assets.length > 0) {
              setImages((prevImages) => [...prevImages, result.assets[0].uri]);
              setUploadCount((prevCount) => prevCount + 1);
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
            });
            if (!result.canceled && result.assets.length > 0) {
              setImages((prevImages) => [...prevImages, result.assets[0].uri]);
              setUploadCount((prevCount) => prevCount + 1);
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    setUploadCount((prevCount) => prevCount - 1);
  };

  const handleImageUpload = (imageUri) => {
    const newImages = [...images, imageUri];
    setImages(newImages);
    setUploadCount(newImages.length);  // Update upload count
    console.log(`Updated upload count: ${newImages.length}`);
};
  const handleDonePress = async () => {
    if (images.length >= requiredImage && imageDescription.trim() !== '')   {
      console.log('All conditions met, performing submission.');
      Toast.show({
        type: 'error',
        text1: 'Submission Error',
        text2: 'Please provide a description and images before submitting.',
      });
      return;
    }

    const formData = new FormData();
    images.forEach((imageUri) => {
      const filename = imageUri.split('/').pop();
      const type = filename.split('.').pop();
      formData.append('images', { uri: imageUri, name: filename, type: `image/${type}` });
      formData.append('uploadDates', uploadDates[index]);
    });

    formData.append('description', imageDescription);
    formData.append('userId', userId);
    formData.append('challengeId', _id);
    
    try {
      await axios.post(`${API_URL}/api/challenge-completion/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }      });
      Toast.show({ type: 'success', text1: 'Submission Successful', text2: 'Your challenge completion has been submitted.' });
      setTimeout(() => navigation.goBack(), 500);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Submission Failed', text2: error.message });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
        <Image source={{ uri: imageUrl }} style={{ width, height: height * 0.45 }} />

        <View style={{ padding: 20 }}>
          {/* Task Info */}
          <TaskInfo
            taskNo={taskNo}
            name={name}
            challenge={challenge}
            benefitsToSociety={benefitsToSociety}
            timeline={timeline}
            points={points}
            carbonEmission={carbonEmission}
          />

          {/* Task Timer */}
          {taskStarted && <Timer timeLeft={timeLeft} />}

          {/* Task Start Button */}
          {!taskStarted && <StartButton startTask={startTask} />}

          {/* Image Uploader */}
          {taskStarted && (
            <>
              <ImageUploader
                onImageUpload={handleImageUpload}
                images={images}
                uploadCount={uploadCount}
                requiredImage={requiredImage}
                pickImage={pickImage}
                removeImage={removeImage}
                saveDataLocally={saveImagesToLocalStorage}
              />
              <DescriptionInput imageDescription={imageDescription} setImageDescription={setImageDescription} />

              {/* Done Button */}
              <DoneButton handleDonePress={handleDonePress} />
              </>
          )}
        </View>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default TaskDetails;
