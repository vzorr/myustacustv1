import React from 'react';
import { Text, View, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { reuseableTextStyles } from '../../../../styles/reuseableTextStyles';
import { SVGIcons } from '../../../../config/constants/svg';

interface HeadingProps {
    iconName: keyof typeof SVGIcons;
    headingText: string;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
}

const ProfessionDetailHeading: React.FC<HeadingProps> = ({ headingText, textStyle, containerStyle, iconName }) => {
    const IconComponent = iconName ? SVGIcons[iconName] : null;
    return (
        <View style={[styles.container, containerStyle]}>
            {IconComponent ? <IconComponent /> : null}
            <Text style={[reuseableTextStyles.title, textStyle]}>
                {headingText}
            </Text>
        </View>
    );
};

export default ProfessionDetailHeading;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    }
})
