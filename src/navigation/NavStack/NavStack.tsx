import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserStackParamList } from '../../types/stacksParams';
import SplashScreen from '../../screens/SplashScreen/SplashScreen';
import SignInScreen from '../../screens/AuthScreens/SignIn/SigninUi';
import ForgotPasswordScreen from '../../screens/AuthScreens/SignIn/ForgotPasswordScreen';
import OtpVerficationContainer from '../../screens/AuthScreens/OTP/OtpVerficationContainer';
import NewPasswordScreen from '../../screens/AuthScreens/SignIn/NewPasswordScreen';
import SuccessMessage from '../../screens/AuthScreens/SuccessMessage/SuccessMessage';
import SignUpScreen from '../../screens/AuthScreens/SignIn/SignupScreen';
import ChangePasswordScreen from '../../screens/AuthScreens/SignIn/ChangePasswordScreen';
import AccountBasicInfo from '../../screens/AuthScreens/AccountCreation/AccountBasicInfo';
import LocationsAndPreferences from '../../screens/AuthScreens/AccountCreation/LocationsAndPreferences';
import LocationPickerScreen from '../../screens/AuthScreens/AccountCreation/LocationScreen';
import NotificationPreferences from '../../screens/AuthScreens/AccountCreation/NotificationPreferences';
import TermsAndConditions from '../../screens/AuthScreens/AccountCreation/TermsAndConditions';
import TabStack from '../TabStack/TabStack';
import PostJobPreviewScreen from '../../screens/TabsScreens/PostJobScreens/PostJobPreviewScreen';
import SuccessMessageScreen from '../../screens/TabsScreens/PostJobScreens/SuccessMessageScreen';
import { client1 } from '../../apiManager/Client';
import { useDispatch } from 'react-redux';
import { setMetaData } from '../../stores/reducer/GeneralMetaDataReducer';
import LoadingScreen from '../../components/Loader/LoadingScreen';
import PostedJobDetailScreen from '../../screens/TabsScreens/JobsStatusTopTabs/PostedJobDetailScreen';
import ApplicationsList from '../../screens/TabsScreens/Applications/ApplicationsList';
import ApplicationDetailScreen from '../../screens/TabsScreens/Applications/ApplicationDetailScreen';
import UstaProfileScreen from '../../screens/UstaProfile/UstaProfileScreen';
import UstaPortfolioDetailScreen from '../../screens/UstaProfile/UstaPortfolioDetailScreen';
const Stack = createNativeStackNavigator<UserStackParamList>();

const NavStack: React.FC = () => {
    const dispatch = useDispatch()
    const getMetaData = async () => {
        let res = await client1().get('general/meta')
        if (res.data?.code !== 200) {
            return
        }
        dispatch(setMetaData(res?.data?.result))
    }
    useEffect(() => {
        getMetaData()
    }, [])
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='UstaProfile'
        >
            <Stack.Screen name="Tabs" component={TabStack} />
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="OtpVerfication" component={OtpVerficationContainer} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            <Stack.Screen name="SuccessMessage" component={SuccessMessage} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="AccountBasicInfo" component={AccountBasicInfo} />
            <Stack.Screen name="LocationsAndPreferences" component={LocationsAndPreferences} />
            <Stack.Screen name="LocationScreen" component={LocationPickerScreen} />
            <Stack.Screen name="NotificationPreferences" component={NotificationPreferences} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen name="PostJobPreview" component={PostJobPreviewScreen} />
            <Stack.Screen name="SuccessMessageScreen" component={SuccessMessageScreen} />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="PostedJobDetailScreen" component={PostedJobDetailScreen} />
            <Stack.Screen name="ApplicationsList" component={ApplicationsList} />
            <Stack.Screen name="ApplicationDetail" component={ApplicationDetailScreen} />
            <Stack.Screen name="UstaProfile" component={UstaProfileScreen} />
            <Stack.Screen name="UstaPortfolioDetail" component={UstaPortfolioDetailScreen} />
        </Stack.Navigator>
    )
}

export default NavStack