import React from 'react';
import { Text, View, TextStyle, ViewStyle } from 'react-native';
import { reuseableTextStyles } from '../../styles/reuseableTextStyles';

interface HeadingProps {
    headingText: string;
    style?: TextStyle;
    containerStyle?: ViewStyle;
}

const Heading: React.FC<HeadingProps> = ({ headingText, style, containerStyle }) => {
    return (
        <View style={[containerStyle]}>
            <Text style={[reuseableTextStyles.title, style]}>
                {headingText}
            </Text>
        </View>
    );
};

export default Heading;
