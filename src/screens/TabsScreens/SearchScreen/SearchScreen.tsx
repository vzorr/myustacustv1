import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'

const SearchScreen: React.FC<UserNavigationRootProps<"SearchScreen">> = (props) => {
    return (
        <View style={styles.container}>
            <Text>Search </Text>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})