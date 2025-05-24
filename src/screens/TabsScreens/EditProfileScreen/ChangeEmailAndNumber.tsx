import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import ReUseableHeader from '../../../components/AppHeader/ReUseableHeader'
import { COLORS, fontSize } from '../../../config/themes/theme'
import CustomButton from '../../../components/Buttons/CustomButton'
import Heading from '../../../components/Heading/Heading'
import SubHeading from '../../../components/Heading/SubHeading'
import RedBorderTextInput from '../../../components/InputField/RedBorderTextInput'

const ChangeEmailAndNumber: React.FC<UserNavigationRootProps<"ChangeEmailAndNumber">> = (props) => {
    const { navigation, route } = props
    const screenType = route.params?.screenType
    const handleCode = () => {
        if (screenType === "EmailScreen") {
            navigation.navigate("OtpVerfication", {
                phoneOrEmail: "email",
                token: "emailToken",
                screenType: "EmailScreen",
            })
        } else if (screenType === "PhoneNumberScreen") {
            navigation.navigate("OtpVerfication", {
                phoneOrEmail: "number",
                token: "numberToken",
                screenType: "PhoneNumberScreen",
            })
        }
    }
    return (
        <View style={styles.container}>
            <ReUseableHeader
                headerText={screenType === "EmailScreen" ? "E-MAIL" : "PHONE NUMBER"}
            />
            <View style={styles.contentContainer}>
                <View />
                <View style={styles.headingContainer}>
                    <Heading
                        headingText={screenType === "EmailScreen" ? "Change Email" : "Change Phone Number"}
                        style={{ fontSize: fontSize[20], textAlign: 'center' }}
                    />
                    <SubHeading
                        subHeadingText={screenType === "EmailScreen" ? "Enter your new email below to receive a code to change it" : "Enter your new phone number below to receive a code to change it"}
                        subTitle={{ fontSize: fontSize[14], textAlign: 'center' }}
                    />
                    <RedBorderTextInput
                        containerStyle={{ width: '90%' }}
                        error={screenType === "EmailScreen" ? "An account with this email already exists" : "An account with this phone number already exists"}
                        placeholder={screenType === "EmailScreen" ? "Enter your new email" : "Enter your new phone number"}
                    />
                </View>
                <CustomButton
                    title={'Send Code'}
                    onPress={handleCode}
                    style={{ width: '100%' }}
                />
            </View>
        </View>
    )
}

export default ChangeEmailAndNumber

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    contentContainer: {
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headingContainer: {
        flex: 1,
        gap: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})