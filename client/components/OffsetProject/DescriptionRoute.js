import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import ReusableCard from './ReusableCard';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const DescriptionRoute = () => {
    const [selectedCard, setSelectedCard] = useState({
        heading: "Investment Type",
        content: "Carbon credit equity",
        index: 0,
    });

    const cards = [
        {
            icon: "cash-sharp",
            heading: "Investment Type",
            content: "Carbon credit equity",
        },
        {
            icon: "albums-sharp",
            heading: "Registry/Standard",
            content: "",
        },
        {
            icon: "id-card-sharp",
            heading: "Project ID with selected registry",
            content: "",
        },
        {
            icon: "logo-bitcoin",
            heading: "Value of Single Token",
            content: "1 ton³ CO2",
        },
        {
            icon: "analytics",
            heading: "Estimated Annual Emission Reduction",
            content: "",
        },
        {
            icon: "globe-outline",
            heading: "Project Country",
            content: "",
        },
        {
            icon: "people",
            heading: "Associated Entities",
            content: "",
        },
        {
            icon: "document",
            heading: "Description of Project",
            content: "",
        },
    ];

    const handleCardSelection = (card, index) => {
        setSelectedCard({ ...card, index });
    };

    return (
        <LinearGradient colors={['#4f6d55', '#779472']} style={styles.gradientContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Project Name</Text>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.iconsWrapper}>
                    <ScrollView contentContainerStyle={styles.iconContent} showsVerticalScrollIndicator={false}>
                        {cards.map((card, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleCardSelection(card, index)}
                                style={[
                                    styles.iconButton,
                                    selectedCard.index === index && styles.selectedIcon
                                ]}
                            >
                                <LinearGradient
                                    colors={selectedCard.index === index ? ['#4f6d55', '#779472'] : ['#ffffff', '#ffffff']}
                                    style={styles.iconBackground}
                                >
                                    <Ionicons
                                        name={card.icon}
                                        size={30}
                                        color={selectedCard.index === index ? 'white' : 'green'}
                                        style={styles.icon}
                                    />
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.cardContainer}>
                    <ReusableCard
                        colors={['#4f6d55', '#779472']}
                        heading={selectedCard.heading}
                        content={selectedCard.content}
                    />
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 10,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    contentContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    iconsWrapper: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 1,
        marginRight: 1,
        justifyContent: 'center',
    },
    iconContent: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconButton: {
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    selectedIconBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedIcon: {
        backgroundColor: 'transparent',
    },
    icon: {
        marginHorizontal: 10,
    },
    cardContainer: {
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DescriptionRoute;
