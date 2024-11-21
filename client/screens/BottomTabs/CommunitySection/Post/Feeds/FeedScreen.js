import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import FeedCard from './FeedCard';
import MutualFriends from './MutualFriends';

const FeedScreen = ({ navigation }) => {
    const [feeds, setFeeds] = useState([
        {
            id: '0',
            type: 'mutualFriends',
            friends: [
                {
                    id: '1',
                    userName: 'Sahil Satheesh',
                    userHandle: '@GoodfootCeo',
                    userImage: require('./assets/sahilSatheesh.png'),
                },
                {
                    id: '2',
                    userName: 'Sruthi P K',
                    userHandle: '@sruthiDeveloper',
                    userImage: require('./assets/Sruthi.png'),
                },
                {
                    id: '3',
                    userName: 'Yadhu Krishna',
                    userHandle: '@Chargemod',
                    userImage: require('./assets/yadhu.jpg'),
                },
            ],
        },
        {
            id: '1',
            userName: 'Sahil Satheesh',
            userHandle: '@GoodfootCeo',
            userImage: require('./assets/sahilSatheesh.png'),
            postImage: require('./assets/sahilSatheesh.png'),
            postText: 'Healthcare of the future! Our motion technology is changing healthcare worldwide.',
            likes: 77,
            comments: ['Great post!', 'Very informative!'],
            liked: false,
            showComments: false,
        },
        {
            id: '2',
            userName: 'Sruthi P K',
            userHandle: '@sruthiDeveloper',
            userImage: require('./assets/Sruthi.png'),
            postImage: require('./assets/Sruthi.png'),
            postText: 'Excited to share our new feature!',
            likes: 45,
            comments: [],
            liked: false,
            showComments: false,
        },
        {
            id: '3',
            userName: 'Yadhu Krishnan',
            userHandle: '@yadhuChargemod',
            userImage: require('./assets/yadhu.jpg'),
            postImage: require('./assets/yadhu.jpg'),
            postText: 'Excited to share our new feature!',
            likes: 45,
            comments: [],
            liked: false,
            showComments: false,
        },
    ]);

    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFeeds, setFilteredFeeds] = useState(feeds);

    const toggleSearchBar = () => {
        setSearchVisible(!searchVisible);
        setSearchQuery('');
        setFilteredFeeds(feeds);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredFeeds(feeds);
        } else {
            const filtered = feeds.filter(feed =>
                feed.userName && feed.userName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredFeeds(filtered);
        }
    };

    const toggleComments = (id) => {
        setFeeds(prevFeeds =>
            prevFeeds.map(feed =>
                feed.id === id ? { ...feed, showComments: !feed.showComments } : feed
            )
        );
    };

    const addComment = (id, comment) => {
        setFeeds(prevFeeds =>
            prevFeeds.map(feed =>
                feed.id === id
                    ? { ...feed, comments: [...feed.comments, comment], showComments: true }
                    : feed
            )
        );
    };

    const renderFeedItem = ({ item }) => {
        if (item.type === 'mutualFriends') {
            return <MutualFriends friends={item.friends} />;
        }
        return (
            <FeedCard
                feed={item}
                onToggleComments={toggleComments}
                onAddComment={addComment}
                navigation={navigation}
            />
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0d0d0e', '#4c6e53']} style={styles.header}>
                <TouchableOpacity onPress={toggleSearchBar} style={styles.searchIcon}>
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
                {searchVisible ? (
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by username..."
                        placeholderTextColor="#ffffff88"
                        value={searchQuery}
                        onChangeText={handleSearch}
                        autoFocus
                    />
                ) : (
                    <View style={styles.headerContent}>
                        <Image
                            source={require('./assets/sahilSatheesh.png')}
                            style={styles.userImageInHeader}
                        />
                        <Text style={styles.userNameInHeader}>Sahil Satheesh</Text>
                    </View>
                )}
            </LinearGradient>

            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Friends')}>
                    <Text style={styles.tabText}>Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Post')}>
                    <Text style={styles.tabText}>Post</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredFeeds}
                renderItem={renderFeedItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.feedContainer}
                extraData={feeds}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        paddingBottom: 80,
    },
    header: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 10,
        height: 250,
        justifyContent: 'center',
    },
    searchIcon: {
        position: 'absolute',
        right: 20,
        top: 50,
        zIndex: 10,
    },
    headerContent: {
        alignItems: 'center',
        marginTop: 20,
    },
    userImageInHeader: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#4c6e53',
    },
    userNameInHeader: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    searchInput: {
        backgroundColor: '#333',
        color: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#333',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: -20,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#4c6e53',
    },
    tabText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    feedContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});

export default FeedScreen;
