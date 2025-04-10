import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'

const ChatScreen: React.FC<UserNavigationRootProps<"ChatScreen">> = (props) => {
    return (
        <View style={styles.container}>
            <Text>PostJobScreen</Text>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})