import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, fontSize, SIZES } from '../../config/themes/theme';

interface ButtonProps {
    cancelText: string;
    confirmText: string;
    onCancel: () => void;
    onConfirm: () => void;
    containerStyle?: ViewStyle;
    buttonStyle?: ViewStyle;
    cancelContainerStyle?: ViewStyle;
    confirmContainerStyle?: ViewStyle;
    cancelTextStyle?: TextStyle;
    confirmTextStyle?: TextStyle;
}

const ConfirmationButtons: React.FC<ButtonProps> = ({ cancelText, confirmText, containerStyle, cancelContainerStyle, confirmContainerStyle, buttonStyle, cancelTextStyle, confirmTextStyle, onCancel, onConfirm }) => (
    <View style={[styles.container, containerStyle]}>
        <TouchableOpacity
            style={[styles.button, styles.cancelButton, buttonStyle, cancelContainerStyle]}
            onPress={onCancel}>
            <Text style={[styles.buttonText, cancelTextStyle]}>{cancelText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, styles.confirmButton, buttonStyle, confirmContainerStyle]}
            onPress={onConfirm}>
            <Text style={[styles.buttonText, confirmTextStyle]}>{confirmText}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        alignSelf: 'center',
        width: "100%",
        height: SIZES.hp(6),
    },
    button: {
        flex: 1,
        height: SIZES.hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    cancelButton: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
    },
    confirmButton: {
        backgroundColor: COLORS.ErrorRed,
    },
    buttonText: {
        fontFamily: FONTS.interMedium,
        fontSize: fontSize[14],
        fontWeight: '500',
        color: COLORS.Navy,
        textAlignVertical: 'center',
    },
});

export default ConfirmationButtons;
