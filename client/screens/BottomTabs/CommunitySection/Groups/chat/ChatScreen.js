import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform, Alert, Clipboard, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import Header from './Header';
import MessageItem from './MessageItem';
import InputArea from './InputArea';
import FullScreenMedia from './FullScreenMedia';

const ChatScreen = ({ route, navigation }) => {
    const { groupName, avatar, previousMessages } = route.params;
    const [messages, setMessages] = useState(previousMessages || []);
    const [newMessage, setNewMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false); // Manage modal visibility here
    const [fullScreenMedia, setFullScreenMedia] = useState(null);
    const [recording, setRecording] = useState(null);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [replyTo, setReplyTo] = useState(null); // For replying to messages
    const [previewImage, setPreviewImage] = useState(null);
    const [previewComment, setPreviewComment] = useState('');
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

    const sendMessage = (uri = null, isDocument = false, comment = '') => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let message;
    
        if (uri && isDocument) {
            message = { id: messages.length + 1, document: uri, time, comment, isSender: true, replyTo };
        } else if (uri && !isDocument) {
            message = { id: messages.length + 1, image: uri, time, comment, isSender: true, replyTo };
        } else if (newMessage.trim()) {
            message = { id: messages.length + 1, text: newMessage, time, isSender: true, replyTo };
            setNewMessage('');
        } else if (recording) {
            message = { id: messages.length + 1, audio: recording.getURI(), duration: recordingDuration, time, comment, isSender: true, replyTo };
            setRecording(null);
            setRecordingDuration(0);
        }
    
        if (message) {
            setMessages([...messages, message]);
            setReplyTo(null); // Clear reply after sending the message
        }
    };

    const handleMicPressIn = () => {
        recordingTimeout.current = setTimeout(startRecording, 100);
    };

    const handleMicPressOut = () => {
        clearTimeout(recordingTimeout.current);
        if (isRecording) {
            stopRecording();
        }
    };

    const pickImageFromGallery = async () => {
        setModalVisible(false); // Close modal after selection
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setPreviewImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        setModalVisible(false); // Close modal after selection
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setPreviewImage(result.assets[0].uri);
        }
    };

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
        if (result.type !== "cancel") {
            sendMessage(result.uri, true, previewComment);
            setPreviewComment('');
        }
    };

    const handleSendPreview = () => {
        if (previewImage) {
            sendMessage(previewImage, false, previewComment);
            setPreviewImage(null);
            setPreviewComment('');
        }
    };

    const handleDownload = () => {
        if (fullScreenMedia) {
            Linking.openURL(fullScreenMedia.uri).catch(err => console.error("Couldn't load page", err));
        }
    };

    const handleDeleteMessage = (messageId) => {
        Alert.alert(
            'Delete Message',
            'Are you sure you want to delete this message?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setMessages(messages.filter((message) => message.id !== messageId));
                    },
                },
            ]
        );
    };

    const handleCopyMessage = (text) => {
        Clipboard.setString(text);
        Alert.alert('Copied to clipboard');
    };

    const handleReplyMessage = (message) => {
        setReplyTo(message);
    };

    const handleForwardMessage = (message) => {
        // Navigate to another screen where the user can select the group to forward the message to
        navigation.navigate('SelectGroupScreen', { message });
    };

    return (
        <LinearGradient
            colors={['#ffff', '#4c6e53']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={90}
            >
                <Header groupName={groupName} avatar={avatar} navigation={navigation} />
                <FlatList
                    data={messages}
                    renderItem={({ item }) => (
                        <MessageItem
                            item={item}
                            setFullScreenMedia={setFullScreenMedia}
                            onDeleteMessage={handleDeleteMessage}
                            onCopyMessage={handleCopyMessage}
                            onReplyMessage={handleReplyMessage}
                            onForwardMessage={handleForwardMessage}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    style={{ flex: 1, paddingHorizontal: 15, paddingTop: 10 }}
                />

                {previewImage && (
                    <View style={{ padding: 10, backgroundColor: '#f1f1f1', borderRadius: 10, margin: 10 }}>
                        <Image source={{ uri: previewImage }} style={{ width: '100%', height: 200, borderRadius: 10 }} />
                        <TextInput
                            style={{ padding: 10, backgroundColor: '#fff', borderRadius: 10, marginVertical: 10 }}
                            placeholder="Add a comment..."
                            value={previewComment}
                            onChangeText={setPreviewComment}
                        />
                        <TouchableOpacity onPress={handleSendPreview} style={{ backgroundColor: '#4c6e53', padding: 10, borderRadius: 10, alignItems: 'center' }}>
                            <Text style={{ color: '#fff' }}>Send</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <InputArea
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    isRecording={isRecording}
                    recordingDuration={recordingDuration}
                    sendMessage={sendMessage}
                    handleMicPressIn={handleMicPressIn}
                    handleMicPressOut={handleMicPressOut}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible} // Pass modalVisible state
                    pickImageFromGallery={pickImageFromGallery}
                    takePhoto={takePhoto}
                    pickDocument={pickDocument}
                    replyTo={replyTo}
                    clearReply={() => setReplyTo(null)} // Clear reply function
                />
            </KeyboardAvoidingView>

            {fullScreenMedia && (
                <FullScreenMedia
                    fullScreenMedia={fullScreenMedia}
                    setFullScreenMedia={setFullScreenMedia}
                />
            )}
        </LinearGradient>
    );
};

export default ChatScreen;
