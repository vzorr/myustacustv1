import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../components/Buttons/CustomButton'
import CustomTextInput from '../../components/InputField/InputBox'

const HomeScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
            <CustomTextInput placeholder="Enter your name" />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    }
})