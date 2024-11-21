// AudioRecorder.js

import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Bar } from 'react-native-progress';

const AudioRecorder = ({ onSend }) => {
    const [recording, setRecording] = useState(null);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const soundRef = useRef(null);

    useEffect(() => {
        const getPermission = async () => {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access microphone is required!');
            }
        };

        getPermission();
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
                alert('Permission to access microphone is required!');
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
            const uri = recording.getURI();
            onSend(uri, recordingDuration);
            setRecording(null);
            setRecordingDuration(0);
        } catch (err) {
            console.error('Failed to stop recording', err);
        }
    };

    const playAudio = async (uri) => {
        const sound = new Audio.Sound();
        try {
            await sound.loadAsync({ uri });
            soundRef.current = sound;
            await sound.playAsync();
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    soundRef.current.unloadAsync();
                }
            });
        } catch (error) {
            console.error('Error playing audio', error);
        }
    };

    return (
        <View style={styles.audioRecorderContainer}>
            <TouchableOpacity
                onPressIn={startRecording}
                onPressOut={stopRecording}
                style={styles.recordButton}
            >
                <Ionicons name={isRecording ? "mic-off" : "mic"} size={24} color="white" />
            </TouchableOpacity>
            {isRecording && (
                <View style={styles.recordingIndicator}>
                    <Text style={styles.recordingText}>{recordingDuration}s</Text>
                    <Bar progress={1} width={200} color="#4c6e53" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    audioRecorderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recordButton: {
        backgroundColor: '#4c6e53',
        padding: 10,
        borderRadius: 20,
    },
    recordingIndicator: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    recordingText: {
        color: 'white',
        marginRight: 10,
    },
});

export default AudioRecorder;
