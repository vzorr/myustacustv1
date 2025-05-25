import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import ReUseableHeader from '../../../components/AppHeader/ReUseableHeader'
import ReuseableHeading from '../../../components/ReUseableHeading/ReuseableHeading'
import { COLORS } from '../../../config/themes/theme'
import CustomButton from '../../../components/Buttons/CustomButton'

const EmailScreen: React.FC<UserNavigationRootProps<"EmailScreen">> = (props) => {
    const { navigation } = props
    const handleChangeEmail = () => {
        navigation.navigate("ChangeEmailAndNumber", { screenType: "EmailScreen" })
    }
    return (
        <View style={styles.container}>
            <ReUseableHeader
                headerText="E-MAIL"
            />
            <View style={styles.contentContainer}>
                <ReuseableHeading
                    title='abidghouri173@gmail.com'
                    iconName='emoji'
                    isRightArrow={false}
                />
                <CustomButton
                    title='Change E-mail'
                    onPress={handleChangeEmail}
                    style={{ width: '100%' }}
                />
            </View>
        </View>
    )
}

export default EmailScreen

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