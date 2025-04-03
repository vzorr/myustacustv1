import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserStackParamList } from '../../types/stacksParams';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import SplashScreen from '../../screens/SplashScreen/SplashScreen';
import SignInScreen from '../../screens/AuthScreens/SignIn/SigninUi';
import ForgotPasswordScreen from '../../screens/AuthScreens/SignIn/ForgotPasswordScreen';
import OtpVerficationContainer from '../../screens/AuthScreens/OTP/OtpVerficationContainer';
import NewPasswordScreen from '../../screens/AuthScreens/SignIn/NewPasswordScreen';
import SuccessMessage from '../../screens/AuthScreens/SuccessMessage/SuccessMessage';
import SignUpScreen from '../../screens/AuthScreens/SignIn/SignupScreen';
import ChangePasswordScreen from '../../screens/AuthScreens/SignIn/ChangePasswordScreen';
import AccountBasicInfo from '../../screens/AuthScreens/AccountCreation/AccountBasicInfo';
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
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="OtpVerfication" component={OtpVerficationContainer} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            <Stack.Screen name="SuccessMessage" component={SuccessMessage} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="AccountBasicInfo" component={AccountBasicInfo} />
        </Stack.Navigator>
    )
}

export default NavStack