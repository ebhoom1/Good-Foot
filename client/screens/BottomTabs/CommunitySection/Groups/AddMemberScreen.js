import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const users = [
    { id: '1', name: 'User 1', avatar: 'https://via.placeholder.com/50' },
    { id: '2', name: 'User 2', avatar: 'https://via.placeholder.com/50' },
    { id: '3', name: 'User 3', avatar: 'https://via.placeholder.com/50' },
    { id: '4', name: 'User 4', avatar: 'https://via.placeholder.com/50' },
    { id: '5', name: 'User 5', avatar: 'https://via.placeholder.com/50' },
    // Add more users as needed
];

const AddMemberScreen = ({ navigation, route }) => {
    const { members, setMembers } = route.params;
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const toggleUserSelection = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const addSelectedUsers = () => {
        const newMembers = users.filter(user => selectedUsers.includes(user.id));
        setMembers([...members, ...newMembers]);
        navigation.goBack();
    };

    const openImagePickerModal = (userId) => {
        setSelectedUserId(userId);
        setModalVisible(true);
    };

    const pickImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            // Update the avatar for the selected user
            users[selectedUserId - 1].avatar = result.assets[0].uri;
        }
        setModalVisible(false);
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            // Update the avatar for the selected user
            users[selectedUserId - 1].avatar = result.assets[0].uri;
        }
        setModalVisible(false);
    };

    const renderUserItem = ({ item }) => (
        <TouchableOpacity onPress={() => toggleUserSelection(item.id)} style={[styles.userItem, selectedUsers.includes(item.id) && styles.selectedUser]}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.userName}>{item.name}</Text>
            {selectedUsers.includes(item.id) && (
                <Ionicons name="checkmark-circle" size={24} color="#4c6e53" style={styles.checkIcon} />
            )}
            <TouchableOpacity onPress={() => openImagePickerModal(item.id)}>
                <Ionicons name="camera" size={24} color="#4c6e53" style={styles.cameraIcon} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <LinearGradient
            colors={['#ffff', '#4c6e53']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Add Members</Text>
            </View>
            <FlatList
                data={users}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
            <TouchableOpacity style={styles.addButton} onPress={addSelectedUsers}>
                <LinearGradient
                    colors={['#ddff00', '#0d0d0e']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.addButtonGradient}
                >
                    <Ionicons name="add" size={24} color="white" />
                    <Text style={styles.addButtonText}>Add to Group</Text>
                </LinearGradient>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.modalOption} onPress={pickImageFromGallery}>
                            <Text style={styles.modalOptionText}>Choose from Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={takePhoto}>
                            <Text style={styles.modalOptionText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4c6e53',
    },
    list: {
        flex: 1,
        paddingHorizontal: 20,
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
        flex: 1,
        fontSize: 18,
        color: '#333',
    },
    checkIcon: {
        marginRight: 15,
    },
    cameraIcon: {
        marginRight: 10,
    },
    addButton: {
        marginVertical: 20,
        alignSelf: 'center',
        width: 200,
        height: 50,
        marginBottom: 80,
    },
    addButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        paddingHorizontal: 15,
        height: '100%',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalOption: {
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    modalOptionText: {
        fontSize: 18,
        color: '#4c6e53',
    },
    modalCancel: {
        marginTop: 10,
    },
    modalCancelText: {
        fontSize: 16,
        color: '#ff3b30',
    },
});

export default AddMemberScreen;
