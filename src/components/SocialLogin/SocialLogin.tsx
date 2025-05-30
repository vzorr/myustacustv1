import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Alert } from 'react-native';
import { COLORS, FONTS } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import Toast from 'react-native-simple-toast';
import { setUserInfo } from '../../stores/reducer/userInfoReducer';
import { client1 } from '../../apiManager/Client';
import { useDispatch } from 'react-redux';
interface socialLoginProps {
    title: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    loginType?: 'google' | 'facebook';
};
GoogleSignin.configure({
    webClientId: '325502099883-7kplng75glrcedialhq1hvk4u063jd0n.apps.googleusercontent.com',
    
    iosClientId:"275075185365-2ik983eqskl48acteeh8as8u602s5qif.apps.googleusercontent.com",
    offlineAccess: true,
    forceCodeForRefreshToken: true,
    scopes: ['https://www.googleapis.com/auth/drive'],
    profileImageSize: 120
});

const SocialLogin: React.FC<socialLoginProps> = ({ title, style, textStyle, loginType }) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {

    }, []);
    const signInGoogle = async () => {
        const isAvailable = await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        console.log("Play Services Status:", isAvailable);
        try {
            const isAvailable = await GoogleSignin.hasPlayServices();
            console.log('Play Services Available:', isAvailable);
            const userInfo = await GoogleSignin.signIn();
            console.log('Google ID Token:', userInfo);
       
            setIsLoading(true)
            // let payload = {
            //     Provider: "Google",
            //     IdToken: userInfo?.data?.idToken
            // }
            // const response = await client1().post(
            //     `auth/sign-up`, payload
            // );
            // console.log("response?.data", response?.data.data)
            // setIsLoading(false)
            // if (response?.data?.result?.statusCode === 200) {
            //     dispatch(setUserInfo(response?.data?.user));
            //     // navigation.replace("BookListing")
            //     Toast.show(response?.data?.result?.message, Toast.SHORT);

            // }
            console.log('User Info:', userInfo);

        } catch (error: any) {
            setIsLoading(false)

            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              console.log('User cancelled the login flow.');
            } else if (error.code === statusCodes.IN_PROGRESS) {
              console.log('Sign in is in progress.');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              console.log('Play Services not available or outdated.');
            } else {
              console.log('Some other error: ', error);
            }
        }
    }
    const signInMeta = () => {

    }
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={loginType === 'google' ? signInGoogle : signInMeta}>
            {loginType === 'google' ? <SVGIcons.Google /> : <SVGIcons.facebookLogo />}
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: 44,
        // margin: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: COLORS.Yellow,
    },
    buttonText: {
        fontFamily: FONTS.interMedium,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        color: COLORS.Navy,
        textAlignVertical: 'center',
        marginStart: 8,
    },
});

export default SocialLogin;