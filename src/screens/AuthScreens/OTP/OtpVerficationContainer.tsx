import React, { useState, FC, useEffect } from 'react'
import OtpVerificationUi from './OtpVerificationUi';
import { UserNavigationRootProps } from '../../../types/stacksParams';

const OtpVerficationContainer: FC<UserNavigationRootProps<"OtpVerfication">> = (props) => {
    const verInfo = props.route.params?.verification
    const type = props.route.params?.type
    console.log("verInfo", type)
    console.log(verInfo)
    const { navigation } = props
    const inputs: any = [];
    const [otp, setOtp] = useState(['', '', '', '']);
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
        const fullCode = otp.join("");
        const otpParse = Number(fullCode)
        if (fullCode.length === 4) {
        }
        else {
            setErrorMessage("otp code is not correct")
        }
    }
    const resendOtp = async () => {

    }
    useEffect(() => {
        const fullCode = otp.join("");
        if (fullCode.length === 4) {
            if (type) {
                navigation.navigate("ChangePassword", { emailorPhoneNo: "email" })
            } else {
                navigation.navigate("NewPassword", { emailorPhoneNo: verInfo })
            }
        }
    }, [otp])
    return (
        <OtpVerificationUi
            handleOtpChange={handleOtpChange}
            otp={otp}
            inputs={inputs}
            onSubmit={handleSubmit}
            errorMessage={errorMessage}
            navigation={navigation}
            verInfo={verInfo}
        />

    )
}

export default OtpVerficationContainer
