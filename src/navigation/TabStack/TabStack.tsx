import React from 'react'
import { View, StyleSheet } from 'react-native'
import { UserStackParamList } from '../../types/stacksParams';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabsScreenOptionsStyle } from './tabStyles';
import HomeScreen from '../../screens/TabsScreens/HomeScreen/HomeScreen';
import { CustomBottomTab } from './CustomBottomTab';
import SearchScreen from '../../screens/TabsScreens/SearchScreen/SearchScreen';
import PostJobScreen from '../../screens/TabsScreens/PostJobScreens/PostJobScreen';
import ChatScreen from '../../screens/TabsScreens/ChatScreen/ChatScreen';
import ProfileScreen from '../../screens/TabsScreens/ProfileScreen/ProfileScreen';
import { COLORS } from '../../config/themes/theme';

const Tab = createBottomTabNavigator<UserStackParamList>();

const TabStack: React.FC = () => {
    return (
        <View style={styles.container}>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={tabsScreenOptionsStyle}
                tabBar={props => <CustomBottomTab {...props} />}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ tabBarLabel: "Home" }}
                />
                <Tab.Screen
                    name="SearchScreen"
                    component={SearchScreen}
                    options={{ tabBarLabel: "Search" }}
                />
                <Tab.Screen
                    name="PostJobScreen"
                    component={PostJobScreen}
                    options={{ tabBarLabel: "Post Job" }}
                />
                <Tab.Screen
                    name="ChatScreen"
                    component={ChatScreen}
                    options={{ tabBarLabel: "Messages" }}
                />
                <Tab.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{ tabBarLabel: "Profile" }}
                />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    }
});

export default TabStack