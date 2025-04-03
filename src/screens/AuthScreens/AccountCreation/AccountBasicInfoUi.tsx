import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import accountScreensStyles from '../../../styles/accountScreensStyles'
import CustomTextInput from '../../../components/InputField/InputBox'
import { COLORS } from '../../../config/themes/theme'

const AccountBasicInfoUi = () => {
    return (
        <SafeAreaView style={accountScreensStyles.container}>
            <View>
                <Text style={accountScreensStyles.basicInfoHeading}>Basic Information</Text>
                <Text style={accountScreensStyles.subHeading}>Start by providing your contact details and creating your profile.</Text>
            </View>
            <View style={{ gap: 8 }}>
                <CustomTextInput
                    placeholder="First Name"
                    containerStyle={{ width: "100%" }}
                    inputStyle={{ color: COLORS.Navy, borderColor: COLORS.inputBorder }}
                />
                <CustomTextInput
                    placeholder="Last Name"
                    containerStyle={{ width: "100%" }}
                    inputStyle={{ color: COLORS.Navy, borderColor: COLORS.inputBorder }}
                />
                <CustomTextInput
                    placeholder="Create Password"
                    isPassword={true}
                    containerStyle={{ width: "100%" }}
                    inputStyle={{ color: COLORS.Navy, borderColor: COLORS.inputBorder }}
                />
                <CustomTextInput
                    placeholder="Re-Enter Password"
                    isPassword={true}
                    containerStyle={{ width: "100%" }}
                    inputStyle={{ color: COLORS.Navy, borderColor: COLORS.inputBorder }}
                />
            </View>
        </SafeAreaView>
    )
}

export default AccountBasicInfoUi

const styles = StyleSheet.create({

})