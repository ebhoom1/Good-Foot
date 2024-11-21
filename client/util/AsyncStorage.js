import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveImagesToLocalStorage = async (images) => {
    try {
      const jsonValue = JSON.stringify(images);
      await AsyncStorage.setItem('@challenge_images', jsonValue);
    } catch (e) {
      console.error("Failed to save images:", e); // Log the error to the console for debugging
      Alert.alert("Error", "Failed to save images: " + e.message);
    }
  };
  
  // When the timer ends
export  const clearLocalStorage = async () => {
    await AsyncStorage.removeItem('@challenge_images');
  };
  