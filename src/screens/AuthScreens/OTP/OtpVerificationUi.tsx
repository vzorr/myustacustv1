import React, { useState } from 'react'

import { Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { otpCodeStyle } from './OtpCodeStyle';
import ErrorText from '../../../components/ErrorText';
import CustomButton from '../../../components/Buttons/CustomButton';
import { COLORS } from '../../../config/themes/theme';
import AuthOverlay from '../../../components/AuthOverlay/AuthOverlay';
const OtpVerificationUi = (props: any) => {
    const { onSubmit, handleOtpChange, otp, inputs, errorMessage, navigation, verInfo } = props
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const handleResendOTP = () => {
        // navigation.navigate("NewPassword");
        navigation.replace("SuccessMessage", { screenType: "OtpVerfication" })
    };

    const handleKeyPress = (event: any, index: number) => {
        if (event.nativeEvent.key === 'Backspace') {
            let newOtp = [...otp];
            if (newOtp[index] === '') {
                if (index > 0) {
                    newOtp[index - 1] = '';
                    handleOtpChange('', index - 1);
                    setFocusedIndex(index - 1);
                    inputs[index - 1]?.focus();
                }
            } else {
                newOtp[index] = '';
                handleOtpChange('', index);
            }
        }
    };

    return (
        <SafeAreaView style={otpCodeStyle.container}>
            <AuthOverlay color={COLORS.authBgColor} />
            <KeyboardAvoidingView>
                <View style={otpCodeStyle.otpContainer}>
                    <View>
                        <Text style={otpCodeStyle.title}>Check your email.</Text>
                    </View>
                    <View style={otpCodeStyle.subTitleContainer}>
                        <Text style={otpCodeStyle.subTitle}>We just sent a 4-digit code to {verInfo}. Please enter it below.</Text>
                    </View>
                    <View style={otpCodeStyle.boxContainer}>
                        {otp.map((digit: any, index: number) => (
                            <TextInput
                                key={index}
                                style={[
                                    otpCodeStyle.box,
                                    focusedIndex === index && {
                                        borderColor: COLORS.white
                                    }
                                ]}
                                maxLength={1}
                                keyboardType="numeric"
                                cursorColor={COLORS.white}
                                onChangeText={(value) => handleOtpChange(value, index)}
                                value={digit}
                                ref={(input) => {
                                    inputs[index] = input;
                                }}
                                onFocus={() => setFocusedIndex(index)}
                                onBlur={() => setFocusedIndex(null)}
                                onKeyPress={(event) => handleKeyPress(event, index)}
                            />
                        ))}
                    </View>
                    {errorMessage &&
                        <ErrorText
                            error={errorMessage}
                        />
                    }
                    <TouchableOpacity
                        onPress={handleResendOTP}
                        style={otpCodeStyle.resendContainer}>
                        <Text style={otpCodeStyle.dontTxt}>Didn’t receive the code?</Text>
                        <Text
                            style={otpCodeStyle.resend}
                        >
                            Resend
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default OtpVerificationUi



