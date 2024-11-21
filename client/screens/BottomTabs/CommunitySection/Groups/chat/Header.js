import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ groupName, avatar, navigation }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile', { groupName, avatar })} style={styles.headerContent}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <Text style={styles.groupName}>{groupName}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4c6e53',
        padding: 15,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    groupName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Header;
