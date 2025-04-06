import { View, Text } from 'react-native'
import React from 'react'
import accountScreensStyles from '../../styles/accountScreensStyles'
interface headerProps {
    title: string;
    subTitle: string;
}

const AccountHeader: React.FC<headerProps> = ({ title, subTitle }) => {
    return (
        <View style={{ marginTop: 10, gap: 8 }}>
            <Text style={accountScreensStyles.basicInfoHeading}>{title}</Text>
            <Text style={accountScreensStyles.subHeading}>{subTitle}</Text>
        </View>
    )
}

export default AccountHeader