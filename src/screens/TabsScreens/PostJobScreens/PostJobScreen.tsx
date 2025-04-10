import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'

const PostJobScreen: React.FC<UserNavigationRootProps<"PostJobScreen">> = (props) => {
    return (
        <View style={styles.container}>
            <Text>PostJobScreen</Text>
        </View>
    )
}

export default PostJobScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})