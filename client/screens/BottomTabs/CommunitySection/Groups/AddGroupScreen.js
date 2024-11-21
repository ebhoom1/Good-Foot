import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const users = [
    { id: '1', name: 'User 1', avatar: 'https://via.placeholder.com/50' },
    { id: '2', name: 'User 2', avatar: 'https://via.placeholder.com/50' },
    { id: '3', name: 'User 3', avatar: 'https://via.placeholder.com/50' },
    { id: '4', name: 'User 4', avatar: 'https://via.placeholder.com/50' },
    { id: '5', name: 'User 5', avatar: 'https://via.placeholder.com/50' },
];

const AddGroupScreen = ({ navigation }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupImage, setGroupImage] = useState(null);

    const toggleUserSelection = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const pickImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setGroupImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setGroupImage(result.assets[0].uri);
        }
    };

    const handleImagePicker = () => {
        Alert.alert(
            "Select Image",
            "Choose an option",
            [
                {
                    text: "Choose from Gallery",
                    onPress: pickImageFromGallery,
                },
                {
                    text: "Take Photo",
                    onPress: takePhoto,
                },
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ]
        );
    };

    const proceedToNext = () => {
        if (selectedUsers.length > 0) {
            setIsModalVisible(true);
        } else {
            alert('Please select at least one user');
        }
    };

    const createGroup = () => {
        console.log("Group Created:", { groupName, groupImage, selectedUsers });
        setIsModalVisible(false);
        navigation.navigate('Groups');  // Navigate back to the GroupsScreen
    };

    const renderUserItem = ({ item }) => (
        <TouchableOpacity onPress={() => toggleUserSelection(item.id)} style={[styles.userItem, selectedUsers.includes(item.id) && styles.selectedUser]}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.userName}>{item.name}</Text>
            {selectedUsers.includes(item.id) && <Ionicons name="checkmark-circle" size={24} color="#4c6e53" />}
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#0d0d0e', '#4c6e53']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.container}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Create Group</Text>
                </View>
                <LinearGradient
                    colors={['#ffff', '#4c6e53']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.content}
                >
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Select Users</Text>
                        <TouchableOpacity style={styles.nextButton} onPress={proceedToNext}>
                            <Ionicons name="arrow-forward" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={users}
                        renderItem={renderUserItem}
                        keyExtractor={item => item.id}
                        style={styles.list}
                    />
                </LinearGradient>
            </LinearGradient>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(!isModalVisible);
                }}
            >
                <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={styles.modalContentWrapper}
                        >
                            <ScrollView contentContainerStyle={styles.modalContentContainer}>
                                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                                    <View style={styles.modalContent}>
                                        <Text style={styles.sectionTitle}>Group Details</Text>
                                        <View style={styles.groupDetails}>
                                            <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
                                                {groupImage ? (
                                                    <Image source={{ uri: groupImage }} style={styles.groupImage} />
                                                ) : (
                                                    <Ionicons name="camera" size={50} color="#4c6e53" />
                                                )}
                                            </TouchableOpacity>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Group Name"
                                                value={groupName}
                                                onChangeText={setGroupName}
                                            />
                                        </View>
                                        <TouchableOpacity style={styles.createButton} onPress={createGroup}>
                                            <LinearGradient
                                                colors={['#ddff00', '#0d0d0e']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                style={styles.createButtonGradient}
                                            >
                                                <Text style={styles.createButtonText}>Create Group</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 60,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 45,
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        marginTop: -30,
        paddingTop: 30,
        paddingBottom: 80,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4c6e53',
        padding: 10,
    },
    nextButton: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: 'transparent',
    },
    list: {
        flex: 1,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    selectedUser: {
        backgroundColor: '#d3f9d8',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    userName: {
        fontSize: 18,
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.49)',
    },
    modalContentWrapper: {
        width: '100%',
        height: '50%',
    },
    modalContentContainer: {
        flexGrow: 1,
    },
    modalContent: {
        backgroundColor: '#171717',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        height: '100%',
    },
    groupDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePicker: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#4c6e53',
        borderRadius: 50,
        width: 100,
        height: 100,
        marginRight: 15,
    },
    groupImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    input: {
        borderWidth: 1,
        borderColor: '#4c6e53',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 18,
        flex: 1,
        color: "white"
    },
    createButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    createButtonGradient: {
        width: 200,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddGroupScreen;
