import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const ImageUploader = ({ requiredImage }) => {
    const [images, setImages] = useState(Array(requiredImage).fill(null));

    const verifyLocationPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission not granted',
                'You need to grant location permissions to use this feature.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };
    

    const verifyPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant photo library permissions to use this feature.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const handlePickImage = async (index) => {
        if (!(await verifyPermissions())) {
            console.log("Required permissions are not granted.");
            return;
        }
    
        const action = await new Promise(resolve => {
            Alert.alert("Upload Photo", "Choose an option", [
                { text: "Camera", onPress: () => resolve("camera") },
                { text: "Gallery", onPress: () => resolve("gallery") },
                { text: "Cancel", onPress: () => resolve(null), style: "cancel" }
            ]);
        });
    
        if (!action) return;
    
        let pickerResult;
        if (action === "camera") {
            pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 1,
                exif: true,
            });
        } else if (action === "gallery") {
            pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
                exif: true,
            });
        }
    
        if (pickerResult.cancelled) {
            console.log("Picker operation cancelled.");
            return;
        }
    
        const asset = pickerResult.assets[0];
        const uri = asset.uri;
        const newImages = [...images];
        newImages[index] = { 
            uri: uri, 
            date: new Date().toISOString(),
            latitude: asset.exif?.GPSLatitude, 
            longitude: asset.exif?.GPSLongitude
        };
        setImages(newImages);
        saveDataLocally(newImages);
    };
    
    ;

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages[index] = null;
        setImages(updatedImages);
        saveDataLocally(updatedImages);
    };

    const saveDataLocally = async (images) => {
        try {
            const jsonValue = JSON.stringify(images);
            await AsyncStorage.setItem('@challenge_images', jsonValue);
        } catch (e) {
            console.error("Failed to save images:", e);
        }
    };

    return (
        <View style={styles.container}>
        {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
                {image ? (
                    <>
                        <Image source={{ uri: image.uri }} style={styles.image} />
                        <Text style={styles.imageText}>Uploaded on: {new Date(image.date).toLocaleDateString()}</Text>
            {image.latitude && image.longitude && (
                <Text style={styles.imageText}>
                    Location: {image.latitude.toFixed(3)}, {image.longitude.toFixed(3)}
                </Text>
            )}
                        <TouchableOpacity onPress={() => handleRemoveImage(index)} style={styles.deleteButton}>
                            <Ionicons name="trash-outline" size={24} color="red" />
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity onPress={() => handlePickImage(index)} style={styles.uploadButton}>
                        <Ionicons name="camera-outline" size={20} color="black" style={{ marginRight: 8 }} />
                        <Text style={styles.uploadButtonText}>Add Photo</Text>
                    </TouchableOpacity>
                )}
            </View>
        ))}
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
},
imageContainer: {
    width: '50%', // each container takes up half the width of the parent
    padding: 5,
    alignItems: 'center',
},
image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
},
deleteButton: {
    padding: 8,
    marginTop: 4,
    borderRadius: 4,
},
uploadButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:100, // take full width of the container
    padding: 10,
},
uploadButtonText: {
    color: 'black',
    fontWeight:'bold',
    fontSize: 16,
},
imageText: {
    fontSize: 12,
    color: '#333',
    fontWeight:'bold',
    marginVertical: 4,
},
});


export default ImageUploader;
