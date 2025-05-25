import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import ReUseableHeader from '../../../components/AppHeader/ReUseableHeader'
import { COLORS } from '../../../config/themes/theme'
import CustomTextInput from '../../../components/InputField/InputBox'
import CustomButton from '../../../components/Buttons/CustomButton'

const UpdatePassword: React.FC<UserNavigationRootProps<"UpdatePassword">> = (props) => {
    return (
        <View style={styles.container}>
            <ReUseableHeader
                headerText="PASSWORD"
            />
            <View style={styles.contentContainer}>
                <View style={{ gap: 10 }}>
                    <CustomTextInput
                        placeholder={"Old Password"}
                        placeholderTextColor={COLORS.Navy}
                        secureTextEntry={true}
                        isPassword={true}
                        containerStyle={styles.inputFieldContainer}
                        inputStyle={styles.inputField}
                        basicInfo="basicInfo"
                    />
                    <CustomTextInput
                        placeholder={"New Password"}
                        placeholderTextColor={COLORS.Navy}
                        secureTextEntry={true}
                        isPassword={true}
                        containerStyle={styles.inputFieldContainer}
                        inputStyle={styles.inputField}
                        basicInfo="basicInfo"
                    />
                    <CustomTextInput
                        placeholder={"Re-Enter Password"}
                        placeholderTextColor={COLORS.Navy}
                        secureTextEntry={true}
                        isPassword={true}
                        containerStyle={styles.inputFieldContainer}
                        inputStyle={styles.inputField}
                        basicInfo="basicInfo"
                    />
                </View>
                <CustomButton
                    title='Change Password'
                    onPress={() => { }}
                    style={{ width: '100%', alignSelf: 'center' }}

                />
            </View>
        </View>
    )
}

export default UpdatePassword

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
        // alignItems: 'center',
    },
    inputFieldContainer: {},
    inputField: {
        borderColor: COLORS.inputBorder,
        color: COLORS.Navy,
    },
})