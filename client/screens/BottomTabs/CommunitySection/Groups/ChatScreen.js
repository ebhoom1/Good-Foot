import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Modal, Alert, Linking } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import ProgressBar from 'react-native-progress/Bar';

const AudioPlayer = ({ uri, duration }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const soundRef = useRef(null);

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    const handlePlayPause = async () => {
        if (soundRef.current && isPlaying) {
            await soundRef.current.pauseAsync();
            setIsPlaying(false);
        } else if (soundRef.current && !isPlaying) {
            await soundRef.current.playAsync();
            setIsPlaying(true);
        } else {
            const { sound } = await Audio.Sound.createAsync({ uri });
            soundRef.current = sound;
            setIsPlaying(true);
            await sound.playAsync();

            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.isPlaying) {
                    setProgress(status.positionMillis / status.durationMillis);
                }
                if (status.didJustFinish) {
                    setIsPlaying(false);
                    setProgress(1);
                }
            });
        }
    };

    return (
        <View style={styles.audioContainer}>
            <TouchableOpacity onPress={handlePlayPause}>
                <Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={24} color="white" />
            </TouchableOpacity>
            <ProgressBar progress={progress} width={200} color="#4c6e53" />
            <Text style={styles.audioDuration}>{`${Math.floor(duration / 60)}:${('0' + (duration % 60)).slice(-2)}`}</Text>
        </View>
    );
};

const ChatScreen = ({ route, navigation }) => {

    const { post, group } = route.params;

    const { groupName, avatar, previousMessages } = route.params;
    const [messages, setMessages] = useState(previousMessages || []);
    const [newMessage, setNewMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [fullScreenMedia, setFullScreenMedia] = useState(null);
    const [recording, setRecording] = useState(null);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const recordingTimeout = useRef(null);

    useEffect(() => {
        const getPermissions = async () => {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            const audioPermission = await Audio.requestPermissionsAsync();

            if (cameraPermission.status !== 'granted' || mediaLibraryPermission.status !== 'granted' || audioPermission.status !== 'granted') {
                Alert.alert('Permission Denied', 'You need to grant all permissions to use this feature.');
            }
        };
        getPermissions();
    }, []);

    useEffect(() => {
        if (isRecording && recording) {
            const interval = setInterval(() => {
                setRecordingDuration((prev) => prev + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isRecording, recording]);

    const sendMessage = (imageUri = null, documentUri = null) => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let message;

        if (imageUri) {
            message = { id: messages.length + 1, image: imageUri, time, isSender: true };
        } else if (documentUri) {
            message = { id: messages.length + 1, document: documentUri, time, isSender: true };
        } else if (newMessage.trim()) {
            message = { id: messages.length + 1, text: newMessage, time, isSender: true };
            setNewMessage('');
        } else if (recording) {
            message = { id: messages.length + 1, audio: recording.getURI(), duration: recordingDuration, time, isSender: true };
            setRecording(null);
            setRecordingDuration(0);
        }

        if (message) {
            setMessages([...messages, message]);
        }
    };

    const pickImageFromGallery = async () => {
        setModalVisible(false);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            sendMessage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        setModalVisible(false);
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            sendMessage(result.assets[0].uri);
        }
    };

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
        if (result.type !== "cancel") {
            sendMessage(null, result.uri);
        }
    };

    const startRecording = async () => {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Permission to access microphone is required!');
                return;
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            setIsRecording(true);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        try {
            setIsRecording(false);
            await recording.stopAndUnloadAsync();
            sendMessage();
        } catch (err) {
            console.error('Failed to stop recording', err);
        }
    };

    const handleMicPressIn = () => {
        recordingTimeout.current = setTimeout(startRecording, 100); // Start recording after 1 second of press
    };

    const handleMicPressOut = () => {
        clearTimeout(recordingTimeout.current);
        if (isRecording) {
            stopRecording();
        }
    };

       const handlePostLinkClick = () => {
        // Navigate to the FeedScreen and pass the post data to view it
        navigation.navigate('FeedScreen', { post });
    };

    const renderMessageItem = ({ item }) => (
        <>
        <View style={[styles.messageContainer, item.isSender ? styles.sentMessage : styles.receivedMessage]}>
            {item.text && <Text style={styles.messageText}>{item.text}</Text>}
            {item.audio && (
                <View>
                    <AudioPlayer uri={item.audio} duration={item.duration} />
                    <Text style={styles.messageTime}>{item.time}</Text>
                </View>
            )}
            {item.image && (
                <TouchableOpacity onPress={() => setFullScreenMedia({ uri: item.image, type: 'image' })}>
                    <Image source={{ uri: item.image }} style={styles.messageImage} />
                    <Text style={styles.messageTime}>{item.time}</Text>
                </TouchableOpacity>
            )}
            {item.document && (
                <TouchableOpacity onPress={() => setFullScreenMedia({ uri: item.document, type: 'document' })}>
                    <Ionicons name="document" size={30} color="white" />
                    <Text style={styles.documentText}>Document</Text>
                    <Text style={styles.messageTime}>{item.time}</Text>
                </TouchableOpacity>
            )}
            {!item.audio && !item.image && !item.document && <Text style={styles.messageTime}>{item.time}</Text>}
        </View>
        <View>
            <Text>Chat with {group.name}</Text>
            {/* Display the post link or content here */}
            <Text>Shared Post: {post.postText}</Text>
            {/* You could make this a clickable link or other content type */}
        </View>
        </>
    );

    const handleDownload = () => {
        if (fullScreenMedia) {
            Linking.openURL(fullScreenMedia.uri).catch(err => console.error("Couldn't load page", err));
        }
    };

    return (
        <LinearGradient
            colors={['#ffff', '#4c6e53']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={90}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile', { groupName, avatar })} style={styles.headerContent}>
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                        <Text style={styles.groupName}>{groupName}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={messages}
                    renderItem={renderMessageItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.messageList}
                />
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
                        <Ionicons name="attach" size={24} color="#4c6e53" />
                    </TouchableOpacity>
                    {isRecording ? (
                        <View style={styles.audioWave}>
                            <Text style={styles.recordingText}>Recording... {recordingDuration}s</Text>
                            <ProgressBar progress={1} width={150} color="#4c6e53" />
                        </View>
                    ) : (
                        <TextInput
                            style={styles.input}
                            placeholder="Type a message..."
                            placeholderTextColor="#888"
                            value={newMessage}
                            onChangeText={setNewMessage}
                        />
                    )}
                    <TouchableOpacity
                        onPress={newMessage ? () => sendMessage() : undefined}
                        onPressIn={!newMessage ? handleMicPressIn : undefined}
                        onPressOut={!newMessage ? handleMicPressOut : undefined}
                        style={styles.sendButton}
                    >
                        <Ionicons name={newMessage ? "send" : "mic"} size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.modalOption} onPress={pickImageFromGallery}>
                            <Ionicons name="image" size={24} color="#4c6e53" />
                            <Text style={styles.modalOptionText}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={takePhoto}>
                            <Ionicons name="camera" size={24} color="#4c6e53" />
                            <Text style={styles.modalOptionText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={pickDocument}>
                            <Ionicons name="document" size={24} color="#4c6e53" />
                            <Text style={styles.modalOptionText}>Document</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={24} color="red" />
                            <Text style={styles.modalOptionText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {fullScreenMedia && (
                <Modal visible={true} transparent={true} onRequestClose={() => setFullScreenMedia(null)}>
                    <View style={styles.fullScreenImageContainer}>
                        {fullScreenMedia.type === 'image' ? (
                            <Image source={{ uri: fullScreenMedia.uri }} style={styles.fullScreenImage} />
                        ) : (
                            <View style={styles.documentContainer}>
                                <Ionicons name="document" size={100} color="white" />
                                <Text style={styles.documentText}>Document</Text>
                            </View>
                        )}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setFullScreenMedia(null)}>
                            <Ionicons name="close" size={36} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                            <Ionicons name="download" size={36} color="white" />
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4c6e53',
        padding: 15,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    groupName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    messageList: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    sentMessage: {
        backgroundColor: '#4c6e53',
        alignSelf: 'flex-end',
    },
    receivedMessage: {
        backgroundColor: '#e1e1e1',
        alignSelf: 'flex-start',
    },
    messageText: {
        color: 'white',
    },
    messageImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginTop: 5,
    },
    documentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImageContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: '90%',
        height: '80%',
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    downloadButton: {
        position: 'absolute',
        bottom: 40,
        right: 20,
    },
    documentText: {
        color: 'white',
        marginTop: 5,
    },
    audioDuration: {
        color: 'white',
        marginTop: 5,
    },
    audioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageTime: {
        fontSize: 10,
        color: '#ccc',
        marginTop: 5,
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'white',
        marginBottom: 80,
    },
    input: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 20,
        marginHorizontal: 10,
        color: '#333',
    },
    audioWave: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recordingText: {
        fontSize: 12,
        color: '#888',
    },
    sendButton: {
        backgroundColor: '#4c6e53',
        padding: 10,
        borderRadius: 20,
    },
    iconButton: {
        marginHorizontal: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: 250,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalOptionText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#4c6e53',
    },
});

export default ChatScreen;
