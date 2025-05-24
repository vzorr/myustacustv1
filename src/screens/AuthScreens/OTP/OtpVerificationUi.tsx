import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { otpCodeStyle } from './OtpCodeStyle';
import ErrorText from '../../../components/ErrorText';
import { COLORS } from '../../../config/themes/theme';
import AuthOverlay from '../../../components/AuthOverlay/AuthOverlay';

const OtpVerificationUi = (props: any) => {
    const { onSubmit, handleOtpChange, otp, inputs, screenType, errorMessage, navigation, verInfo, handleResendOTP } = props
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    useEffect(() => {
        inputs[0]?.focus();
        setFocusedIndex(0);
    }, []);


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
                    <View style={{ width: '80%' }}>
                        <Text style={otpCodeStyle.title}>{screenType === "EmailScreen" ? "Verify your new email." : screenType === "PhoneNumberScreen" ? "Verify your new phone number." : "Check your email"}</Text>
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
                                onChangeText={(value) => {
                                    if (value.length > 1) {
                                        const newOtp = value.split('').slice(0, otp.length);
                                        newOtp.forEach((char, i) => {
                                            handleOtpChange(char, i);
                                        });
                                        const nextIndex = newOtp.length < otp.length ? newOtp.length : otp.length - 1;
                                        inputs[nextIndex]?.focus();
                                        setFocusedIndex(nextIndex);
                                    } else {
                                        handleOtpChange(value, index);
                                        if (value && index < otp.length - 1) {
                                            inputs[index + 1]?.focus();
                                            setFocusedIndex(index + 1);
                                        }
                                    }
                                }}
                                value={digit}
                                ref={(input) => {
                                    inputs[index] = input;
                                }}
                                onFocus={() => {
                                    const allPrevFilled = otp.slice(0, index).every((val: string) => val !== '');
                                    if (index === 0 || allPrevFilled) {
                                        setFocusedIndex(index);
                                    } else {
                                        const firstEmptyIndex = otp.findIndex((val: string, i: number) => i < index && val === '');
                                        if (firstEmptyIndex !== -1) {
                                            inputs[firstEmptyIndex]?.focus();
                                            setFocusedIndex(firstEmptyIndex);
                                        }
                                    }
                                }}

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
