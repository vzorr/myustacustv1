import React from 'react';
import { TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../config/themes/theme';

interface AppTextAreaProps extends TextInputProps {
    containerStyle?: ViewStyle;
}

const DescriptionInput: React.FC<AppTextAreaProps> = ({ containerStyle, style, ...rest }) => {
    return (
        <TextInput
            style={[styles.input, containerStyle, style]}
            multiline={true}
            placeholderTextColor={COLORS.Navy}
            textAlignVertical="top"
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        borderRadius: 8,
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        color: COLORS.white,
        fontWeight: '400',
        paddingHorizontal: 12,
        paddingVertical: 10,
        minHeight: 100,
        textAlign: 'left',
    },
});

export default DescriptionInput;
