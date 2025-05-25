import { Text, View } from 'react-native'
import React from 'react'
import CustomTextInput from '../../../components/InputField/InputBox'
import { editProfileStyles } from './editProfileStyles'
import { COLORS } from '../../../config/themes/theme'
import DescriptionInput from '../../../components/InputField/DescriptionInput'
import CustomSelector from '../../../components/Selector/CustomSelector'
import CustomButton from '../../../components/Buttons/CustomButton'

const EditProfileUi = (props: any) => {
    const { handleEmail, handlePhoneNumber, handlePassword, handleSaveChanges } = props

    return (
        <View style={editProfileStyles.container}>
            <View style={{ gap: 8 }}>
                <CustomTextInput
                    containerStyle={editProfileStyles.input}
                    placeholder={"Enter your name"}
                    placeholderTextColor={COLORS.Navy}
                />
                <DescriptionInput
                    containerStyle={editProfileStyles.input}
                    placeholder={"Describe Yourself..."}
                    placeholderTextColor={COLORS.Navy}
                />
                <CustomSelector
                    title='E-Mail'
                    iconName='rightArrow'
                    onPress={handleEmail}
                />
                <CustomSelector
                    title='Phone Number'
                    iconName='rightArrow'
                    onPress={handlePhoneNumber}
                />
                <CustomSelector
                    title='Password'
                    iconName='rightArrow'
                    onPress={handlePassword}
                />
            </View>
            <CustomButton
                title='Save Changes'
                onPress={handleSaveChanges}
                style={{ width: '100%', alignSelf: 'center' }}
            />
        </View>
    )
}

export default EditProfileUi