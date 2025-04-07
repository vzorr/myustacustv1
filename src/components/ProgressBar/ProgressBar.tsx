import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
interface ProgressBarProps {
    backgroundColor: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    backgroundColor,
}) => {
    return (
        <View
            style={{
                width: '33%',
                height: 8,
                borderRadius: 48,
                backgroundColor: backgroundColor,
            }}
        />
    )
}

export default ProgressBar