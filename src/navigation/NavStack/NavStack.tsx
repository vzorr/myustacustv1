import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserStackParamList } from '../../types/stacksParams';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import SplashScreen from '../../screens/SplashScreen/SplashScreen';
import SignInScreen from '../../screens/AuthScreens/SignIn/SigninUi';
const Stack = createNativeStackNavigator<UserStackParamList>();

const NavStack: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='Splash'
        >
            {/* <Stack.Screen name="Tabs" component={TabStack} /> */}
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default NavStack