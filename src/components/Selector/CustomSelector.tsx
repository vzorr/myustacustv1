import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    View,
} from 'react-native';
import { COLORS, FONTS, fontSize, SIZES } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';

interface SelectorProps {
    title: string;
    onPress?: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    iconName?: keyof typeof SVGIcons;
    disabled?: boolean;
}

const CustomSelector: React.FC<SelectorProps> = ({
    title,
    onPress,
    iconName,
    disabled,
    style,
    textStyle,
}) => {
    const IconComponent = iconName ? SVGIcons[iconName] : null;

    return (
        <TouchableOpacity style={[styles.contianer, style]} onPress={onPress} disabled={disabled}>
            <Text style={[styles.selectorTxt, textStyle]}>{title}</Text>
            {IconComponent ? <IconComponent /> : null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contianer: {
        width: '100%',
        height: SIZES.hp(6.1),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        backgroundColor: COLORS.white,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    selectorTxt: {
        fontFamily: FONTS.interMedium,
        fontSize: fontSize[14],
        fontStyle: 'normal',
        fontWeight: '500',
        color: COLORS.Navy,
        textAlignVertical: 'center',
    },
});

export default CustomSelector;
