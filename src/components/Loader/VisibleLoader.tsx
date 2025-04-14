import React from 'react'
import { View } from 'react-native'
import LoadingScreen from './LoadingScreen'

const VisibleLoader = () => {
    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
            <LoadingScreen />
        </View>
    )
}

export default VisibleLoader