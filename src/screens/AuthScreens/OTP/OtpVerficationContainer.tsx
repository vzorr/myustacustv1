import React, { useState, FC, useEffect, useCallback } from 'react'
import OtpVerificationUi from './OtpVerificationUi';
import { UserNavigationRootProps } from '../../../types/stacksParams';

import Toast from 'react-native-simple-toast';
import { Alert } from 'react-native';
import VisibleLoader from '../../../components/Loader/VisibleLoader';
import { useFocusEffect } from '@react-navigation/native';
import { client, client1 } from '../../../apiManager/Client';
import { setUserInfo } from '../../../stores/reducer/userInfoReducer';
import { useDispatch } from 'react-redux';
const OtpVerficationContainer: FC<UserNavigationRootProps<"OtpVerfication">> = (props) => {
    const verInfo = props.route.params?.verification
    const type = props.route.params?.type
    const screenTypeEmailOrNumber = props.route.params?.screenType
    const emailorPhoneNo = props.route.params?.phoneOrEmail
    const verifiedToken = props.route.params?.token
    const dispatch = useDispatch()
    console.log("phoneNoConfirmation", verifiedToken, emailorPhoneNo)
    const [isLoading, setIsLoading] = useState(false)
    const { navigation } = props
    const inputs: any = [];
    const [otp, setOtp] = useState(['', '', '', '']);
    const [errorMessage, setErrorMessage] = useState("");
    const handleOtpChange = (value: any, index: any) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < newOtp.length - 1) {
            inputs[index + 1].focus();
        }
    };
    const handleSubmit = async () => {
        const fullCode = otp.join("");
        const otpParse = Number(fullCode)
        if (fullCode.length === 4) {
            if (verifiedToken) {
                try {
                    let payload = {
                        code: fullCode
                    }
                    setIsLoading(true)
                    const response = await client(verifiedToken).post(`auth/signup-verify`, payload);
                    console.log("responseeeee", response?.data)
                    if (screenTypeEmailOrNumber === "EmailScreen") {
                        navigation.replace("EmailScreen", { emailorPhoneNo: verInfo, code: fullCode })
                    } else if (screenTypeEmailOrNumber === "PhoneNumberScreen") {
                        navigation.replace("PhoneNumberScreen", { emailorPhoneNo: verInfo, code: fullCode })
                    } else {
                        navigation.replace("SuccessMessage", { screenType: "OtpVerfication" })
                    }
                    dispatch(setUserInfo(response?.data?.result))
                    Toast.show('otp is verified', Toast.SHORT);
                    setIsLoading(false)
                    return

                    //   navigation.navigate("NewPassword", { emailorPhoneNo: verInfo })
                } catch (error) {
                    setIsLoading(false)
                    Toast.show('Invalid OTP. Please try again.', Toast.SHORT);
                }
            } else {
                try {
                    let payload = {
                        email: emailorPhoneNo,
                        code: fullCode,
                        role: 'customer'
                    }
                    setIsLoading(true)
                    const response = await client1().post(`auth/verify-otp`, payload);
                    console.log("responseeeee", response?.data)
                    navigation.replace("NewPassword", { emailorPhoneNo: emailorPhoneNo, code: fullCode })
                    Toast.show('otp is verified', Toast.SHORT);
                    setIsLoading(false)
                    return

                } catch (error) {
                    console.log("errrrror", error)
                    setIsLoading(false)
                    Toast.show('Invalid OTP. Please try again.', Toast.SHORT);
                }
            }

        }
        else {
            setErrorMessage("otp code is not correct")
        }
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
    useFocusEffect(
        useCallback(() => {
            const fullCode = otp.join("");
            if (fullCode.length === 4) {
                handleSubmit();
            }
            return () => {
            };
        }, [otp])
    );

    const handleResendOTP = async () => {
        if (verifiedToken) {
            try {
                setIsLoading(true)
                const response = await client(verifiedToken).post(`auth/signup-resend`);
                console.log("signup-resend", response?.data)
                Toast.show('OTP resent successfully', Toast.SHORT);
                setIsLoading(false)
                return

                //   navigation.navigate("NewPassword", { emailorPhoneNo: verInfo })
            } catch (error) {
                setIsLoading(false)
                Toast.show('Invalid OTP. Please try again.', Toast.SHORT);
            }
        } else {
            try {
                setIsLoading(true)
                const response = await client1().post(`auth/resend-otp`, { email: emailorPhoneNo, role: 'customer' });
                Toast.show('OTP resent successfully', Toast.SHORT);
                setIsLoading(false)
                return
            } catch (error) {
                setIsLoading(false)
                Toast.show('Invalid OTP. Please try again.', Toast.SHORT);
            }
        }
    };
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
                handleResendOTP={handleResendOTP}
                screenType={screenTypeEmailOrNumber}
            />
            {isLoading &&
                <VisibleLoader />
            }
        </>

    )
}

export default OtpVerficationContainer
