import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GroupsScreen from './CommunitySection/Groups/GroupsScreen';
import FeedScreen from './CommunitySection/Post/Feeds/FeedScreen';
import RealScreen from './CommunitySection/Reals/RealScreen';
import AddGroupScreen from './CommunitySection/Groups/AddGroupScreen';
import ProfileScreen from './CommunitySection/Groups/ProfileScreen';
import AddMemberScreen from './CommunitySection/Groups/AddMemberScreen';
import ChatScreen from './CommunitySection/Groups/chat/ChatScreen';
import PostScreen from './CommunitySection/Post/PostScreen';
import FriendsScreen from './CommunitySection/Post/FriendsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FeedStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Post" component={PostScreen}  options={{ headerShown: false }}/>
            <Stack.Screen name="Friends" component={FriendsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

const GroupsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Groups" component={GroupsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddMember" component={AddMemberScreen} />
            <Stack.Screen name="AddGroup" component={AddGroupScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;

                const isFocused = state.index === index;

                const iconName =
                    route.name === 'Group' ? 'people-sharp' :
                    route.name === 'Feed' ? 'document-text-sharp' :
                    'videocam-sharp';

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={styles.tabItemContainer}
                    >
                        <View style={[styles.iconContainer, isFocused && styles.focusedIconContainer]}>
                            <Ionicons name={iconName} size={isFocused ? 28 : 24} color={isFocused ? '#3aa04e' : 'gray'} />
                        </View>
                        {isFocused && (
                            <Text style={styles.focusedLabel}>{label}</Text>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const CommunityScreen = () => {
    return (
        <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen name="Group" component={GroupsStack} options={{ headerShown: false }} />
            <Tab.Screen name="Feeds" component={FeedStack} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: 'space-around',
        paddingBottom: 10,
        paddingTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width,
        height: 70,
    },
    tabItemContainer: {
        flex: 1,
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'transparent',
    },
    focusedIconContainer: {
        backgroundColor: '#3aa04e',
        position: 'absolute',
        top: -20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
    },
    focusedLabel: {
        color: 'white',
        fontSize: 12,
        marginTop: 5,
    },
});

export default CommunityScreen;
