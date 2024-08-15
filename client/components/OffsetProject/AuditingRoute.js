import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import ReusableCard from './ReusableCard';

const openPDF = () => {
    const pdfUrl = 'https://docs.google.com/document/d/18wAhzwlc7xB51ZXzJfj67TqGEzl4oIewMkHsZLmZD_c/edit#heading=h.mpkjn41whsd8';
    Linking.openURL(pdfUrl).catch(err => console.error("Couldn't load page", err));
};

const AuditingRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#fff' }]}>
        <TouchableOpacity style={styles.card} onPress={openPDF}>
            <ReusableCard
                colors={['#4f6d55', '#779472']}
                heading="Auditing"
                content="Click here to open the PDF"
            />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        alignItems: 'center',
    },
    card: {
        width: '90%',
        borderRadius: 15,
        padding: 20,
        marginTop: 20,
        
    },
});

export default AuditingRoute;
