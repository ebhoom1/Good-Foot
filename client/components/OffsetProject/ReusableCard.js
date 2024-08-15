import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ReusableCard = ({ colors, heading, content, image }) => {
    return (
        <LinearGradient colors={colors} style={styles.card}>
            {image && (
                <Image source={image} style={styles.image} />
            )}
            <Text style={styles.heading}>{heading}</Text>
            {content && (
                <Text style={styles.text}>{content}</Text>
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
    },
    image: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
});

export default ReusableCard;
