import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserStackParamList } from '../../../types/stacksParams';
import HomeScreen from '../HomeScreen/HomeScreen';
import JobsStatusScreens from './JobsStatusScreens';
import ApplicationsList from '../Applications/ApplicationsList';
import ApplicationDetailScreen from '../Applications/ApplicationDetailScreen';
import UstaProfileScreen from '../../UstaProfile/UstaProfileScreen';
import UstaPortfolioDetailScreen from '../../UstaProfile/UstaPortfolioDetailScreen';
import NotificationContainer from '../Notifications/NotificationContainer';
import ProfessionDetailScreen from '../HomeScreen/ProfessionsDetail/ProfessionDetailScreen';
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
            <Stack.Screen name="ProfessionDetailScreen" component={ProfessionDetailScreen} />
            <Stack.Screen name="ApplicationsList" component={ApplicationsList} />
            <Stack.Screen name="ApplicationDetail" component={ApplicationDetailScreen} />
            <Stack.Screen name="UstaProfile" component={UstaProfileScreen} />
            <Stack.Screen name="UstaPortfolioDetail" component={UstaPortfolioDetailScreen} />
            <Stack.Screen name="Notifications" component={NotificationContainer} />
        </Stack.Navigator>
    )
}

export default JobsStatusSackNav