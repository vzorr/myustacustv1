import React from 'react'
import { UserStackParamList } from '../../types/stacksParams';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabsScreenOptionsStyle } from './tabStyles';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
const Tab = createBottomTabNavigator<UserStackParamList>();

const TabStack: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={tabsScreenOptionsStyle}
        // tabBar={props => (
        //     <TabBarScrollable {...props} />
        // )}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
        </Tab.Navigator>
    )
}

export default TabStack