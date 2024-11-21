import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const MutualFriends = ({ friends }) => {
    return (
        <View>
            <Text style={styles.sectionTitle}>Mutual Friends</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                {friends.map(friend => (
                    <View key={friend.id} style={styles.card}>
                        <Image source={friend.userImage} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>{friend.userName}</Text>
                        <Text style={styles.cardSubtitle}>{friend.userHandle}</Text>
                        <TouchableOpacity style={styles.cardButton}>
                            <Text style={styles.cardButtonText}>Add Friend +</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    horizontalScroll: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#2a2a2a',
        borderRadius: 15,
        padding: 15,
        width: 220,
        marginRight: 15,
    },
    cardImage: {
        width: '100%',
        height: 150,
        borderRadius: 15,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#cccccc',
        marginBottom: 10,
    },
    cardButton: {
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#4c6e53',
        alignItems: 'center',
    },
    cardButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default MutualFriends;
