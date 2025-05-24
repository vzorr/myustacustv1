import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import ReUseableHeader from '../../../components/AppHeader/ReUseableHeader'
import ReuseableHeading from '../../../components/ReUseableHeading/ReuseableHeading'
import CustomButton from '../../../components/Buttons/CustomButton'
import { COLORS } from '../../../config/themes/theme'

const PhoneNumberScreen: React.FC<UserNavigationRootProps<"PhoneNumberScreen">> = (props) => {
    const { navigation } = props
    const handleChangeEmail = () => {
        navigation.navigate("ChangeEmailAndNumber", { screenType: "PhoneNumberScreen" })
    }
    return (
        <View style={styles.container}>
            <ReUseableHeader
                headerText="PHONE NUMBER"
            />
            <View style={styles.contentContainer}>
                <ReuseableHeading
                    title='0336 6432173'
                    iconName='emoji'
                    isRightArrow={false}
                />
                <CustomButton
                    title='Change Phone Number'
                    onPress={handleChangeEmail}
                    style={{ width: '100%' }}
                />
            </View>
        </View>
    )
}

export default PhoneNumberScreen

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
    }
})