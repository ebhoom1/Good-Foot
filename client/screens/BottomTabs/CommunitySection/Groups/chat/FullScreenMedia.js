import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Modal } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const FullScreenMedia = ({ fullScreenMedia, setFullScreenMedia, handleDownload }) => {
    return (
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
               
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
    documentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    documentText: {
        color: 'white',
        marginTop: 5,
    },
});

export default FullScreenMedia;
