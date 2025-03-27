import React, { useState } from 'react'

import { Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { otpCodeStyle } from './OtpCodeStyle';
import ErrorText from '../../../components/ErrorText';
import CustomButton from '../../../components/Buttons/CustomButton';
import { COLORS } from '../../../config/themes/theme';
import AuthOverlay from '../../../components/AuthOverlay/AuthOverlay';
const OtpVerificationUi = (props: any) => {
    const { onSubmit, handleOtpChange, otp, inputs, errorMessage, navigation } = props
    const handleResendOTP = () => {
        navigation.navigate("NewPassword")
    }

    return (
        <SafeAreaView style={otpCodeStyle.otpContainer}>
            <AuthOverlay color={COLORS.authBgColor} />
            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={otpCodeStyle.title}>Check your email.</Text>
                    <Text style={otpCodeStyle.subTitle}>We just sent a 4-digit code to {"igli@myusta.al"}. Please enter it below.</Text>
                    <View style={otpCodeStyle.container}>
                        {otp.map((digit: any, index: any) => (
                            <TextInput
                                key={index}
                                style={otpCodeStyle.box}
                                maxLength={1}
                                keyboardType="numeric"
                                onChangeText={(value) => handleOtpChange(value, index)}
                                value={digit}
                                ref={(input) => {
                                    inputs[index] = input;
                                }}
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



