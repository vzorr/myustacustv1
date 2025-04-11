import { View, Text, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import accountScreensStyles from '../../styles/accountScreensStyles'
interface headerProps {
    title: string;
    subTitle: string;
    titleStyle?: TextStyle;
    subTitleStyle?: TextStyle;
    containerStyle?: ViewStyle;
}

const AccountHeader: React.FC<headerProps> = ({ title, subTitle, containerStyle, titleStyle, subTitleStyle }) => {
    return (
        <View style={[{ marginTop: 10, gap: 8 }, containerStyle]}>
            <Text style={[accountScreensStyles.basicInfoHeading, titleStyle]}>{title}</Text>
            <Text style={[accountScreensStyles.subHeading, subTitleStyle]}>{subTitle}</Text>
        </View>
    )
}

export default AccountHeader