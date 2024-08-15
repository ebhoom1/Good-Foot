import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TextInput, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PagerView from 'react-native-pager-view';
import CustomOffsetProjectButton from '../../components/OffsetProject/CustomOffsetProjectButton';
import Modal from 'react-native-modal';
import DescriptionRoute from '../../components/OffsetProject/DescriptionRoute';
import AuditingRoute from '../../components/OffsetProject/AuditingRoute';
import { PanGestureHandler } from 'react-native-gesture-handler';

const initialLayout = { width: Dimensions.get('window').width };

const ProjectOffsetScreen = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Description' },
        { key: 'second', title: 'Auditing' },
    ]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');

    const renderScene = SceneMap({
        first: DescriptionRoute,
        second: AuditingRoute,
    });

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handleContinue = () => {
        console.log('Continue with email:', email);
        setModalVisible(false);
    };

    const openMetaMask = () => {
        const metamaskUrl = 'https://metamask.app.link/dapp/example.com';
        Linking.openURL(metamaskUrl).catch(err => console.error("Couldn't load MetaMask", err));
    };

    const openTrustWallet = () => {
        const trustWalletUrl = 'https://link.trustwallet.com/open_url?url=https://example.com';
        Linking.openURL(trustWalletUrl).catch(err => console.error("Couldn't load Trust Wallet", err));
    };

    const openCoinbase = () => {
        const coinbaseUrl = 'https://go.cb-w.com/dapp?url=https://example.com';
        Linking.openURL(coinbaseUrl).catch(err => console.error("Couldn't load Coinbase", err));
    };

    const onSwipeRight = ({ nativeEvent }) => {
        if (nativeEvent.translationX > 100) {  // Adjust this value as needed
            navigation.goBack();
        }
    };

    return (
        <PanGestureHandler onGestureEvent={onSwipeRight}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Offset</Text>
                </View>
                <View style={styles.topPicksContainer}>
                    <Text style={styles.topPicksText}>
                        Offset Your{'\n'}Carbon footprint
                    </Text>
                    <Image
                        source={require('../../assets/OffsetIcons/tree.png')}
                        style={styles.topPicksImage}
                    />
                    <CustomOffsetProjectButton
                        title="Buy Now"
                        onPress={toggleModal}
                        style={styles.buyNowButton}
                    />
                </View>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            indicatorStyle={styles.indicator}
                            style={styles.tabBar}
                            labelStyle={styles.label}
                            renderLabel={({ route, focused }) => (
                                <View style={focused ? styles.focusedTab : styles.tab}>
                                    <Text style={styles.label}>{route.title}</Text>
                                </View>
                            )}
                        />
                    )}
                    renderPager={props => <PagerView {...props} />}
                />
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={toggleModal}
                    swipeDirection="down"
                    onSwipeComplete={toggleModal}
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        <ScrollView>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Choose Your Plan</Text>
                            </View>
                            <TextInput
                                style={styles.emailInput}
                                placeholder="Enter your email"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={handleEmailChange}
                            />
                            <TouchableOpacity style={styles.planCard} onPress={openMetaMask}>
                                <Image
                                    source={require('../../assets/OffsetIcons/metamask-icon.png')}
                                    style={styles.walletIcon}
                                />
                                <View style={styles.planTextContainer}>
                                    <Text style={styles.planTitle}>MetaMask</Text>
                                    <Text style={styles.planDescription}>Connect with MetaMask</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.planCard} onPress={openTrustWallet}>
                                <Image
                                    source={require('../../assets/OffsetIcons/trust-wallet-icon.png')}
                                    style={styles.walletIcon}
                                />
                                <View style={styles.planTextContainer}>
                                    <Text style={styles.planTitle}>Trust Wallet</Text>
                                    <Text style={styles.planDescription}>Connect with Trust Wallet</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.planCard} onPress={openCoinbase}>
                                <Image
                                    source={require('../../assets/OffsetIcons/coinbase-icon.png')}
                                    style={styles.walletIcon}
                                />
                                <View style={styles.planTextContainer}>
                                    <Text style={styles.planTitle}>Coinbase</Text>
                                    <Text style={styles.planDescription}>Connect with Coinbase</Text>
                                </View>
                            </TouchableOpacity>
                            <CustomOffsetProjectButton
                                title="Continue"
                                onPress={handleContinue}
                                style={styles.continueButton}
                            />
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'flex-start', // Align items to the start (left)
        padding: 16,
        backgroundColor: '#4c6e53',
    },
    backButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop:30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        paddingTop: 20, // Add some padding at the top for spacing
    },
    topPicksContainer: {
        padding: 16,
        backgroundColor: '#4c6e53',
        height: 250,
        borderBottomRightRadius: 60,
        position: 'relative',
    },
    topPicksImage: {
        width: 180,
        height: 180,
        position: 'absolute',
        top: 30,
        right: 20,
    },
    topPicksText: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#e1c510',
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    buyNowButton: {
        position: 'absolute',
        top: 70,
        left: 20,
        backgroundColor: '#007bff',
    },
    tabBar: {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
    },
    label: {
        color: 'black',
        fontWeight: 'bold',
    },
    indicator: {
        backgroundColor: '#ffff',
        height: '100%',
        borderRadius: 15,
        marginBottom: 5,
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 15,
        margin: 5,
        backgroundColor: 'transparent',
    },
    focusedTab: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 15,
        margin: 5,
        backgroundColor: '#4c6e53',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#333',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '60%',
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    planCard: {
        backgroundColor: '#444',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    planTextContainer: {
        marginLeft: 10,
    },
    planTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    planDescription: {
        fontSize: 14,
        color: '#ccc',
        marginTop: 5,
    },
    emailInput: {
        backgroundColor: '#555',
        padding: 15,
        borderRadius: 10,
        color: '#fff',
        marginTop: 20,
        marginBottom: 20,
    },
    continueButton: {
        backgroundColor: '#3f8b4e',
        padding: 15,
        borderRadius: 10,
    },
    walletIcon: {
        width: 50,
        height: 50,
    },
});

export default ProjectOffsetScreen;
