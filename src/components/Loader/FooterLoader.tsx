import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../../config/themes/theme'

const FooterLoader = () => {
    return (
        <View style={{justifyContent: 'center', flex:1, alignItems:'center' }}>
            <ActivityIndicator size="large" color={COLORS.Navy} />
        </View>

    )
}

export default FooterLoader