import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import { COLORS } from '../../../config/themes/theme'
import ReUseableHeader from '../../../components/AppHeader/ReUseableHeader'
import EditProfileUi from './EditProfileUi'

const EditProfileContainer: React.FC<UserNavigationRootProps<"EditProfile">> = (props) => {
    const { navigation } = props
    const handleEmail = () => {
        navigation.navigate("EmailScreen")
    }
    const handlePhoneNumber = () => {
        navigation.navigate("PhoneNumberScreen")
    }
    const handlePassword = () => {
        navigation.navigate("UpdatePassword")
    }
    const handleSaveChanges = () => {
        // navigation.navigate("ProfileScreen")
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar backgroundColor={COLORS.Navy} barStyle="light-content" />
            <ReUseableHeader
                headerText="PROFILE DETAILS"
            />
            <EditProfileUi
                handleEmail={handleEmail}
                handlePhoneNumber={handlePhoneNumber}
                handlePassword={handlePassword}
                handleSaveChanges={handleSaveChanges}
            />
        </View>
    )
}

export default EditProfileContainer