import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Audio } from 'expo-av';

const MessageItem = ({ item, setFullScreenMedia, onDeleteMessage, onCopyMessage, onReplyMessage, onForwardMessage }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);
    const [playbackStatus, setPlaybackStatus] = useState(null);
    const soundRef = useRef(null);

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    const handlePlayPauseAudio = async () => {
        if (sound && isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
        } else if (sound && !isPlaying) {
            if (playbackStatus && playbackStatus.positionMillis === playbackStatus.durationMillis) {
                await sound.setPositionAsync(0); // Reset to start if audio is finished
            }
            await sound.playAsync();
            setIsPlaying(true);
        } else {
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: item.audio });
            setSound(newSound);
            soundRef.current = newSound;
            await newSound.playAsync();
            setIsPlaying(true);

            newSound.setOnPlaybackStatusUpdate((status) => {
                setPlaybackStatus(status);
                if (status.didJustFinish) {
                    setIsPlaying(false);
                }
            });
        }
    };

    const handleLongPress = () => {
        Alert.alert(
            'Message Options',
            'What do you want to do with this message?',
            [
                { text: 'Copy', onPress: () => onCopyMessage(item.text || '') },
                { text: 'Reply', onPress: () => onReplyMessage(item) },
                { text: 'Forward', onPress: () => onForwardMessage(item) },
                { text: 'Delete', style: 'destructive', onPress: () => onDeleteMessage(item.id) },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    return (
        <TouchableOpacity onLongPress={handleLongPress} style={[styles.messageContainer, item.isSender ? styles.sentMessage : styles.receivedMessage]}>
            {item.replyTo && (
                <View style={styles.replyContainer}>
                    <Text style={styles.replyText}>Replying to:</Text>
                    <View style={styles.replyMessage}>
                        <Text style={styles.replyMessageText}>{item.replyTo.text || 'A file or media'}</Text>
                    </View>
                </View>
            )}
            {item.text && <Text style={styles.messageText}>{item.text}</Text>}
            {item.audio && (
                <View style={styles.audioContainer}>
                    <TouchableOpacity onPress={handlePlayPauseAudio}>
                        <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#ffffff" />
                    </TouchableOpacity>
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
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
    replyContainer: {
        borderLeftColor: '#4c6e53',
        borderLeftWidth: 4,
        paddingLeft: 8,
        marginBottom: 4,
    },
    replyMessage: {
        backgroundColor: '#dfe6e9',
        padding: 5,
        borderRadius: 5,
        marginVertical: 5,
    },
    replyText: {
        color: '#4c6e53',
        fontStyle: 'italic',
    },
    replyMessageText: {
        color: '#2d3436',
    },
    messageText: {
        color: 'white',
    },
    audioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    messageImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginTop: 5,
    },
    documentText: {
        color: 'white',
        marginTop: 5,
    },
    messageTime: {
        fontSize: 10,
        color: '#ccc',
        marginTop: 5,
        alignSelf: 'flex-end',
    },
});

export default MessageItem;
