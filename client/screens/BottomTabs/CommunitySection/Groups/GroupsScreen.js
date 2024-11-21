import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const data = [
    { id: '1', name: 'Joe Root', date: '25 July, 1:30 pm', avatar: 'https://via.placeholder.com/50', type: 'group' },
    { id: '2', name: 'Navel Joard', date: '19 July, 7:00 am', avatar: 'https://via.placeholder.com/50', type: 'group' },
    { id: '3', name: 'James Anderson', date: '12 July, 10:30 am', avatar: 'https://via.placeholder.com/50', type: 'group' },
    { id: '4', name: 'Meetup 2020', date: '12 July, 12:00 pm', avatar: 'https://via.placeholder.com/50', type: 'group' },
    { id: '5', name: 'dotpixel-agency', date: '17 July, 10:30 am', avatar: 'https://via.placeholder.com/50', type: 'group' },
    { id: '6', name: 'Joe Root', date: '25 July, 1:30 pm', avatar: 'https://via.placeholder.com/50', type: 'group' },
    { id: '7', name: 'Navel Joard', date: '19 July, 7:00 am', avatar: 'https://via.placeholder.com/50', type: 'group' },
    { id: '8', name: 'James Anderson', date: '12 July, 10:30 am', avatar: 'https://via.placeholder.com/50', type: 'group' },
    { id: '9', name: 'Meetup 2020', date: '12 July, 12:00 pm', avatar: 'https://via.placeholder.com/50', type: 'group' },
    { id: '10', name: 'dotpixel-agency', date: '17 July, 10:30 am', avatar: 'https://via.placeholder.com/50', type: 'group' },
];

const GroupsScreen = ({ navigation }) => {
    
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.itemContainer}
            onPress={() => navigation.navigate('ChatScreen', {
                groupName: item.name,
                avatar: item.avatar,
                previousMessages: [] // Pass previous messages here if you have any, otherwise empty array
            })}
        >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.itemTextContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
            </View>
            <View style={styles.itemIconContainer}>
                {item.type === 'group' && <Ionicons name="people-outline" size={24} color="#4c6e53" />}
            </View>
        </TouchableOpacity>
    );

    return (
        <LinearGradient
            colors={['#0d0d0e', '#4c6e53']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.title}>chat</Text>
            </View>
            <LinearGradient
                colors={['#ffff', '#4c6e53']} 
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.content}
            >
                <Text style={styles.sectionTitle}>Groups</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddGroup')}>
                    <LinearGradient
                        colors={['#ddff00', '#0d0d0e']} 
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.addButtonGradient}
                    >
                        <Ionicons name="add" size={24} color="white" />
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 60,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 45,
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        borderTopRightRadius: 50,
        borderTopLeftRadius:50,
        marginTop: -30,  // To overlap the content with the header
        paddingTop: 30,  // To adjust padding after the overlap
        paddingBottom: 80,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#4c6e53',
    },
    list: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    itemTextContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    itemDate: {
        fontSize: 14,
        color: '#888',
    },
    itemIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    addButtonGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GroupsScreen;
