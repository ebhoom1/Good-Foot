import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Modal, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const predefinedColors = [
    '#000000', '#808080', '#C0C0C0', '#FFFFFF', '#800000', '#FF0000', '#808000', '#FFFF00',
    '#008000', '#00FF00', '#008080', '#00FFFF', '#000080', '#0000FF', '#800080', '#FF00FF'
];

const PostScreen = () => {
    const [postText, setPostText] = useState('');
    const [textAlign, setTextAlign] = useState('left');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [textColor, setTextColor] = useState('#FFFFFF');
    const [bgColor, setBgColor] = useState('#333333');
    const [alignmentModalVisible, setAlignmentModalVisible] = useState(false);
    const [colorPickerVisible, setColorPickerVisible] = useState({ text: false, background: false });
    const [pickerType, setPickerType] = useState('text'); // State to track which picker is open
    const navigation = useNavigation();

    const toggleBold = () => setIsBold(!isBold);
    const toggleItalic = () => setIsItalic(!isItalic);

    const handlePost = () => {
        navigation.goBack();
    };

    const toggleAlignmentModal = () => {
        setAlignmentModalVisible(!alignmentModalVisible);
    };

    const selectAlignment = (alignment) => {
        setTextAlign(alignment);
        setAlignmentModalVisible(false);
    };

    const openColorPicker = (type) => {
        setPickerType(type);
        setColorPickerVisible({ text: false, background: false, [type]: true });
    };

    const selectColor = (color) => {
        if (pickerType === 'text') {
            setTextColor(color);
        } else if (pickerType === 'background') {
            setBgColor(color);
        }
        setColorPickerVisible({ text: false, background: false });
    };

    const renderColorOption = ({ item }) => (
        <TouchableOpacity onPress={() => selectColor(item)} style={[styles.colorOption, { backgroundColor: item }]} />
    );

    const closeModal = () => {
        setColorPickerVisible({ text: false, background: false });
        setAlignmentModalVisible(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {/* Alignment Modal */}
                <Modal
                    transparent={true}
                    visible={alignmentModalVisible}
                    animationType="fade"
                    onRequestClose={toggleAlignmentModal}
                >
                    <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
                        <View style={styles.alignmentModal}>
                            <TouchableOpacity onPress={() => selectAlignment('left')} style={styles.modalOption}>
                                <Feather name="align-left" size={24} color="white" />
                                <Text style={styles.modalText}>Left</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectAlignment('center')} style={styles.modalOption}>
                                <Feather name="align-center" size={24} color="white" />
                                <Text style={styles.modalText}>Center</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectAlignment('right')} style={styles.modalOption}>
                                <Feather name="align-right" size={24} color="white" />
                                <Text style={styles.modalText}>Right</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.modalText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

                {/* Color Picker */}
                <Modal
                    transparent={true}
                    visible={colorPickerVisible.text || colorPickerVisible.background}
                    animationType="fade"
                    onRequestClose={closeModal}
                >
                    <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
                        <View style={styles.colorPickerModal}>
                            <Text style={styles.modalText}>
                                Select {pickerType === 'text' ? 'Text' : 'Background'} Color
                            </Text>
                            <FlatList
                                data={predefinedColors}
                                numColumns={4}
                                keyExtractor={(item) => item}
                                renderItem={renderColorOption}
                                contentContainerStyle={styles.colorOptionsContainer}
                            />
                            <TouchableOpacity onPress={() => openColorPicker(pickerType)} style={styles.customColorButton}>
                                <Text style={styles.modalText}>Custom</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.modalText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

                {/* Text Input and Toolbar */}
                <View style={styles.textAreaContainer}>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity style={styles.optionButton} onPress={toggleAlignmentModal}>
                            <Text style={styles.alignText}>A</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={toggleBold}>
                            <FontAwesome5 name="bold" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={toggleItalic}>
                            <FontAwesome5 name="italic" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => openColorPicker('text')}>
                            <Ionicons name="color-palette" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => openColorPicker('background')}>
                            <Ionicons name="color-fill" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Ionicons name="musical-notes" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Ionicons name="color-filter" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={[
                            styles.textArea,
                            { textAlign: textAlign, fontWeight: isBold ? 'bold' : 'normal', fontStyle: isItalic ? 'italic' : 'normal', color: textColor, backgroundColor: bgColor }
                        ]}
                        placeholder="What's on your mind?"
                        placeholderTextColor="#ffffff88"
                        multiline={true}
                        value={postText}
                        onChangeText={setPostText}
                    />
                </View>

                <TouchableOpacity style={styles.postButton} onPress={handlePost}>
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAreaContainer: {
        width: '90%',
        height: '65%',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        minHeight: 200,
        justifyContent: 'flex-start',
        backgroundColor: '#333',
    },
    textArea: {
        color: 'white',
        fontSize: 16,
        textAlignVertical: 'top',
        minHeight: 150,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        height: '85%',
        backgroundColor: 'white',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    optionButton: {
        padding: 5,
        borderRadius: 10,
    },
    alignText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    postButton: {
        backgroundColor: '#4c6e53',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
    },
    postButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alignmentModal: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 20,
        width: 200,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16,
    },
    colorPickerModal: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 20,
        width: 300,
        height: 400,
        justifyContent: 'space-between',
    },
    colorOptionsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorOption: {
        width: 50,
        height: 50,
        margin: 5,
        borderRadius: 5,
    },
    customColorButton: {
        padding: 10,
        backgroundColor: '#555',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#444',
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default PostScreen;
