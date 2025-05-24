import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, fontSize, SIZES } from '../../config/themes/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({ title, onPress, style, textStyle, disabled }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={disabled}>
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: SIZES.hp(6.1),
        margin: 4,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: COLORS.Yellow,
    },
    buttonText: {
        fontFamily: FONTS.interMedium,
        fontSize: fontSize[14],
        fontStyle: 'normal',
        fontWeight: '500',
        color: COLORS.Navy,
        textAlignVertical: 'center',
    },
});

export default CustomButton;