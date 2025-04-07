import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SIZES } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';

interface ButtonProps {
    onPress: () => void;
    style?: ViewStyle;
    iconName?: keyof typeof SVGIcons;
}

const ArrowButton: React.FC<ButtonProps> = ({ onPress, iconName, style }) => {
    const IconComponent = iconName ? SVGIcons[iconName] : null;
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            {IconComponent ? <IconComponent /> : null}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        width: SIZES.hp(6.1),
        height: SIZES.hp(6.1),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: COLORS.Yellow,
    },
});

export default ArrowButton;