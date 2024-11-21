import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import ProgressBar from 'react-native-progress/Bar';
import { Audio } from 'expo-av';

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

const styles = StyleSheet.create({
    audioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    audioDuration: {
        color: 'white',
        marginTop: 5,
    },
});

export default AudioPlayer;
