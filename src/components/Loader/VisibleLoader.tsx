import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const VisibleLoader = () => {
    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>

    )
}

export default VisibleLoader