import React, { useState, FC, useEffect, useCallback } from 'react'
import OtpVerificationUi from './OtpVerificationUi';
import { UserNavigationRootProps } from '../../../types/stacksParams';

import auth from '@react-native-firebase/auth';

import Toast from 'react-native-simple-toast';
import { Alert } from 'react-native';
import VisibleLoader from '../../../components/Loader/VisibleLoader';
import { useFocusEffect } from '@react-navigation/native';
const OtpVerficationContainer: FC<UserNavigationRootProps<"OtpVerfication">> = (props) => {
    const verInfo = props.route.params?.verification
    const type = props.route.params?.type
    const emailorPhoneNo = props.route.params?.phoneOrEmail
    const phoneNoConfirmation = props.route.params?.otpConfirmation
    console.log("phoneNoConfirmation", phoneNoConfirmation)
    const [isLoading, setIsLoading] = useState(false)
    const { navigation } = props
    const inputs: any = [];
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [errorMessage, setErrorMessage] = useState("");
    const handleOtpChange = (value: any, index: any) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        // Move focus to the next box if the current one has a value
        if (value && index < newOtp.length - 1) {
            inputs[index + 1].focus();
        }
    };
    const handleSubmit = async () => {
        // const fullCode = otp.join("");
        // const otpParse = Number(fullCode)
        // if (fullCode.length === 6) {
        //     try {
        //         setIsLoading(true)
        //         const credential = auth.PhoneAuthProvider.credential(verInfo, fullCode);
        //         await auth().signInWithCredential(credential);
        //         setIsLoading(false)
        //         Toast.show('Phone number verified! User signed in', Toast.SHORT);
        //         navigation.navigate('SignIn')

        //         //   navigation.navigate("NewPassword", { emailorPhoneNo: verInfo })
        //     } catch (error) {
        //         setIsLoading(false)
        //         Toast.show('Invalid OTP. Please try again.', Toast.SHORT);
        //     }
        // }
        // else {
        //     setErrorMessage("otp code is not correct")
        // }
    }
    // const verifyOtp = async () => {
    //     try {
    //         const fullCode = otp.join("");
    //         setIsLoading(true)
    //         await phoneNoConfirmation.confirm(fullCode);
    //         setIsLoading(false)
    //         Toast.show("Login Successful", Toast.SHORT);
    //         navigation.navigate('Home')
    //     } catch (error) {
    //         setIsLoading(false)
    //         Toast.show("Invalid OTP. Please try again", Toast.SHORT);
    //         console.error('Error verifying OTP:', error);
    //     }
    // };
    // useFocusEffect(
    //     useCallback(() => {
    //         const fullCode = otp.join("");
    //         if (fullCode.length === 6) {
    //             if (type === "logIn") {
    //                 verifyOtp();
    //             } else {
    //                 handleSubmit();
    //             }
    //         }
    //         return () => {
    //         };
    //     }, [otp, type])
    // );
    return (
        <>
            <OtpVerificationUi
                handleOtpChange={handleOtpChange}
                otp={otp}
                inputs={inputs}
                onSubmit={handleSubmit}
                errorMessage={errorMessage}
                navigation={navigation}
                verInfo={emailorPhoneNo}
            />
            {isLoading &&
                <VisibleLoader />
            }
        </>

    )
}

export default OtpVerficationContainer
