import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FriendsScreen = ({ navigation }) => {
    const [users, setUsers] = useState([
        { id: '1', userName: 'Sahil Satheesh', userHandle: '@GoodfootCeo', userImage: require('./Feeds/assets/sahilSatheesh.png') },
        { id: '2', userName: 'Sruthi P K', userHandle: '@sruthiDeveloper', userImage: require('./Feeds/assets/Sruthi.png') },
        { id: '3', userName: 'Yadhu Krishna', userHandle: '@Chargemod', userImage: require('./Feeds/assets/yadhu.jpg') },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user => 
                user.userName && user.userName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    };

    const renderUserItem = ({ item }) => (
        <View style={styles.userCard}>
            <Image source={item.userImage} style={styles.userImage} />
            <View>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.userHandle}>{item.userHandle}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search friends..."
                placeholderTextColor="#ffffff88"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredUsers}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        paddingTop: 70,
        paddingHorizontal: 20,
    },
    searchInput: {
        backgroundColor: '#333',
        color: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 20,
    },
    listContainer: {
        paddingBottom: 20,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
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
});

export default FriendsScreen;
