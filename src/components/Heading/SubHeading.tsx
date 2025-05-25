import React from 'react';
import { Text, View, TextStyle, ViewStyle } from 'react-native';
import { reuseableTextStyles } from '../../styles/reuseableTextStyles';

interface HeadingProps {
    subHeadingText: string;
    subTitle?: TextStyle;
    containerStyle?: ViewStyle;
}

const SubHeading: React.FC<HeadingProps> = ({ subHeadingText, subTitle, containerStyle }) => {
    return (
        <View style={[containerStyle]}>
            <Text style={[reuseableTextStyles.subTitle, subTitle]}>
                {subHeadingText}
            </Text>
        </View>
    );
};

export default SubHeading;
