import React from 'react';
import { View, TextInput, TouchableOpacity, Modal, Text } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import ProgressBar from 'react-native-progress/Bar';

const InputArea = ({
    newMessage,
    setNewMessage,
    isRecording,
    recordingDuration,
    sendMessage,
    handleMicPressIn,
    handleMicPressOut,
    setModalVisible,
    modalVisible,
    pickImageFromGallery,
    takePhoto,
    pickDocument,
    replyTo, // Props for handling replies
    clearReply, // Function to clear reply
}) => {
    return (
        <View>
            {replyTo && (
                <View style={styles.replyContainer}>
                    <Text style={styles.replyText}>Replying to: {replyTo.text || 'A file or media'}</Text>
                    <TouchableOpacity onPress={clearReply} style={styles.clearReplyButton}>
                        <Ionicons name="close-circle" size={20} color="red" />
                    </TouchableOpacity>
                </View>
            )}
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
        </View>
    );
};

const styles = {
    replyContainer: {
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#4c6e53',
        marginBottom: 10,
        position: 'relative',
    },
    replyText: {
        fontWeight: 'bold',
    },
    clearReplyButton: {
        position: 'absolute',
        top: 5,
        right: 5,
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
    iconButton: {
        marginHorizontal: 5,
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
    input: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 20,
        marginHorizontal: 10,
        color: '#333',
    },
    sendButton: {
        backgroundColor: '#4c6e53',
        padding: 10,
        borderRadius: 20,
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
};

export default InputArea;
