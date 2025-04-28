import React from 'react'
import { View, StyleSheet } from 'react-native'
import { UserStackParamList } from '../../types/stacksParams';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabsScreenOptionsStyle } from './tabStyles';
import { CustomBottomTab } from './CustomBottomTab';
import SearchScreen from '../../screens/TabsScreens/SearchScreen/SearchScreen';
import PostJobScreen from '../../screens/TabsScreens/PostJobScreens/PostJobScreen';
import ProfileScreen from '../../screens/TabsScreens/ProfileScreen/ProfileScreen';
import { COLORS } from '../../config/themes/theme';
import JobsStatusSackNav from '../../screens/TabsScreens/JobsStatusScreens/JobsStatusStackNav';
import ChatListContainer from '../../screens/TabsScreens/ChatScreen/ChatListing/ChatListContainer';

const Tab = createBottomTabNavigator<UserStackParamList>();

const TabStack: React.FC = () => {
    return (
        <View style={styles.container}>
            <Tab.Navigator
                initialRouteName="JobsStatusSackNav"
                screenOptions={tabsScreenOptionsStyle}
                tabBar={props => <CustomBottomTab {...props} />}
            >
                <Tab.Screen
                    name="JobsStatusSackNav"
                    component={JobsStatusSackNav}
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
                    name="ChatList"
                    component={ChatListContainer}
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