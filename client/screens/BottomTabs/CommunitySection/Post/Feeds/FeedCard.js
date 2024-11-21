import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const emojiOptions = [
    { name: 'laugh', icon: '😂' },
    { name: 'smile', icon: '😊' },
    { name: 'fire', icon: '🔥' },
    { name: 'heart', icon: '❤️' },
    { name: 'angry', icon: '😡' },
    { name: 'dislike', icon: '👎' }
];

const groupData = [
    { id: '1', name: 'Group 1', avatar: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Group 2', avatar: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Group 3', avatar: 'https://via.placeholder.com/50' },
];

const FeedCard = ({ feed, navigation }) => {
    if (!feed) {
        console.error("FeedCard component requires a 'feed' prop.");
        return null;
    }

    const [liked, setLiked] = useState(feed.liked || false);
    const [likesCount, setLikesCount] = useState(feed.likes || 0);
    const [comments, setComments] = useState(feed.comments || []);
    const [showComments, setShowComments] = useState(feed.showComments || false);
    const [newComment, setNewComment] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    };

    const handleToggleComments = () => {
        setShowComments(!showComments);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            const newCommentObject = {
                userName: "Current User",  // Replace with the actual current user's name
                userImage: require('./assets/sahilSatheesh.png'),  // Replace with the actual current user's image
                text: newComment,
            };
            setComments([...comments, newCommentObject]);
            setNewComment('');
            setShowComments(true);
        }
    };

    const handleEmojiPress = (emoji) => {
        setNewComment((prev) => prev + emoji);
    };

    const handleShare = () => {
        setModalVisible(true);
    };

    const handleGroupSelect = (group) => {
        // Handle the group selection and share functionality here
        console.log('Selected Group:', group);
        setModalVisible(false);
    };

    return (
        <View style={styles.feedCard}>
            <View style={styles.userInfo}>
                {feed.userImage && (
                    <Image source={feed.userImage} style={styles.userImage} />
                )}
                <View>
                    <Text style={styles.userName}>{feed.userName || "Anonymous"}</Text>
                    <Text style={styles.userHandle}>{feed.userHandle || "@unknown"}</Text>
                </View>
            </View>
            <Text style={styles.postText}>{feed.postText || ""}</Text>
            {feed.postImage && (
                <Image source={feed.postImage} style={styles.postImage} />
            )}
            <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
                    <Ionicons name="heart" size={24} color={liked ? 'red' : 'white'} />
                    <Text style={styles.actionText}>{likesCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleToggleComments} style={styles.actionButton}>
                    <Ionicons name="chatbubble" size={24} color="white" />
                    <Text style={styles.actionText}>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
                    <Ionicons name="share-social" size={24} color="white" />
                    <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
            </View>

            {showComments && (
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.commentSection}
                >
                    <TouchableOpacity onPress={handleToggleComments} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                    {comments.map((comment, index) => (
                        <View key={index} style={styles.commentCard}>
                            <Image source={comment.userImage} style={styles.commentUserImage} />
                            <View style={styles.commentContent}>
                                <Text style={styles.commentUserName}>{comment.userName}</Text>
                                <Text style={styles.commentText}>{comment.text}</Text>
                            </View>
                        </View>
                    ))}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Leave your thoughts here..."
                            placeholderTextColor="#ffffff88"
                            value={newComment}
                            onChangeText={setNewComment}
                        />
                        <TouchableOpacity style={styles.postButton} onPress={handleAddComment}>
                            <Text style={styles.postButtonText}>Post</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emojiContainer}>
                        {emojiOptions.map((emoji) => (
                            <TouchableOpacity key={emoji.name} style={styles.emojiButton} onPress={() => handleEmojiPress(emoji.icon)}>
                                <Text style={styles.emojiText}>{emoji.icon}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </KeyboardAvoidingView>
            )}

            {/* Modal for sharing to groups */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.searchContainer}>
                            <Ionicons name="search" size={20} color="white" />
                            <TextInput 
                                placeholder="Search" 
                                placeholderTextColor="white" 
                                style={styles.searchInput} 
                            />
                        </View>
                        <FlatList
                            data={groupData}
                            keyExtractor={item => item.id}
                            numColumns={3} // Display items in three columns
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.groupItem} >
                                    <Image source={{ uri: item.avatar }} style={styles.groupAvatar} />
                                    <Text style={styles.groupName}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
                            <Ionicons name="close-circle" size={36} color="white" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    feedCard: {
        backgroundColor: '#2a2a2a',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'white',
    },
    userName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    userHandle: {
        color: '#cccccc',
        fontSize: 14,
    },
    postText: {
        color: 'white',
        marginBottom: 10,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        color: 'white',
        marginLeft: 5,
    },
    commentSection: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    commentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        padding: 10,
        borderRadius: 10,
        marginBottom: 5,
    },
    commentUserImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'white',
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    commentUserName: {
        color: 'white',
        fontWeight: 'bold',
    },
    commentText: {
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        color: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
    },
    postButton: {
        backgroundColor: '#4c6e53',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 10,
    },
    postButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emojiContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    emojiButton: {
        padding: 5,
    },
    emojiText: {
        fontSize: 24,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#111111',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '50%',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        height: 40,
    },
    searchInput: {
        color: 'white',
        marginLeft: 10,
        flex: 1,
    },
    groupItem: {
        alignItems: 'center',
        marginVertical: 10,
        width: '30%', // Each item takes up 1/3 of the width with some margin
    },
    groupAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    groupName: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
    },
    closeModalButton: {  
        alignItems: 'center',
        marginTop: 20,
    },
});

export default FeedCard;
