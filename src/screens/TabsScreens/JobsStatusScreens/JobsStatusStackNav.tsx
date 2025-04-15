import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserStackParamList } from '../../../types/stacksParams';
import HomeScreen from '../HomeScreen/HomeScreen';
import JobsStatusScreens from './JobsStatusScreens';
const Stack = createNativeStackNavigator<UserStackParamList>();

const JobsStatusSackNav: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='Home'
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="JobsStatusScreens" component={JobsStatusScreens} />
        </Stack.Navigator>
    )
}

export default JobsStatusSackNav