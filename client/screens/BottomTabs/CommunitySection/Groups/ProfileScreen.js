import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const initialMembers = [
    { id: '1', name: 'Member 1', avatar: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Member 2', avatar: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Member 3', avatar: 'https://via.placeholder.com/50' },
];

const ProfileScreen = ({ route, navigation }) => {
    const { groupName, avatar: initialAvatar } = route.params;
    const [avatar, setAvatar] = useState(initialAvatar);
    const [members, setMembers] = useState(initialMembers);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }
        })();

        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    const handleRemoveMember = (memberId) => {
        Alert.alert(
            'Remove Member',
            'Are you sure you want to remove this member?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Remove',
                    onPress: () => {
                        setMembers(members.filter(member => member.id !== memberId));
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    const pickImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
            setModalVisible(false);
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
            setModalVisible(false);
        }
    };

    const removeImage = () => {
        setAvatar(null);
        setModalVisible(false);
    };

    const renderMemberItem = ({ item }) => (
        <Swipeable
            renderRightActions={() => (
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleRemoveMember(item.id)}
                >
                    <Ionicons name="trash" size={24} color="white" />
                </TouchableOpacity>
            )}
        >
            <View style={styles.memberItem}>
                <Image source={{ uri: item.avatar }} style={styles.memberAvatar} />
                <Text style={styles.memberName}>{item.name}</Text>
            </View>
        </Swipeable>
    );

    return (
        <LinearGradient
            colors={['#ffff', '#4c6e53']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.profileHeader}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    {avatar ? (
                        <Image source={{ uri: avatar }} style={styles.groupAvatar} />
                    ) : (
                        <Ionicons name="person-circle-outline" size={100} color="#4c6e53" />
                    )}
                </TouchableOpacity>
                <Text style={styles.groupName}>{groupName}</Text>
            </View>
            <Text style={styles.sectionTitle}>Group Members</Text>
            <FlatList
                data={members}
                renderItem={renderMemberItem}
                keyExtractor={(item) => item.id}
                style={styles.memberList}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddMember', { members, setMembers })}>
                <LinearGradient
                    colors={['#ddff00', '#0d0d0e']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.addButtonGradient}
                >
                    <Ionicons name="add" size={24} color="white" />
                    <Text style={styles.addButtonText}>Add Member</Text>
                </LinearGradient>
            </TouchableOpacity>

            {/* Modal for image options */}
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
                        <TouchableOpacity style={styles.modalOption} onPress={removeImage}>
                            <Text style={styles.modalOptionText}>Remove Image</Text>
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
    profileHeader: {
        alignItems: 'center',
        marginTop: 60,
    },
    groupAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    groupName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4c6e53',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#4c6e53',
        paddingHorizontal: 20,
    },
    memberList: {
        flex: 1,
        paddingHorizontal: 20,
    },
    memberItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    memberAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    memberName: {
        fontSize: 18,
        color: '#333',
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
    deleteButton: {
        backgroundColor: '#ff3b30',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
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

export default ProfileScreen;
