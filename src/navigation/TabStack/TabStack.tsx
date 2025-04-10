import React from 'react'
import { UserStackParamList } from '../../types/stacksParams';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabsScreenOptionsStyle } from './tabStyles';
import HomeScreen from '../../screens/TabsScreens/HomeScreen/HomeScreen';
import { CustomBottomTab } from './CustomBottomTab';
import SearchScreen from '../../screens/TabsScreens/SearchScreen/SearchScreen';
import PostJobScreen from '../../screens/TabsScreens/PostJobScreens/PostJobScreen';
import ChatScreen from '../../screens/TabsScreens/ChatScreen/ChatScreen';
import ProfileScreen from '../../screens/TabsScreens/ProfileScreen/ProfileScreen';
const Tab = createBottomTabNavigator<UserStackParamList>();

const TabStack: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={tabsScreenOptionsStyle}
            tabBar={props => (
                <CustomBottomTab {...props} />
            )}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
            />
            <Tab.Screen
                name="PostJobScreen"
                component={PostJobScreen}
            />
            <Tab.Screen
                name="ChatScreen"
                component={ChatScreen}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
            />
        </Tab.Navigator>
    )
}

export default TabStack