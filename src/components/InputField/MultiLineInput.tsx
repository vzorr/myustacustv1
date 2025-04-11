import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../config/themes/theme';

interface CustomInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    maxLength: number;
    multiline?: boolean;
    numberOfLines?: number;
    containerStyle?: object;
    inputStyle?: object;
    characterCount?: number;
}

const MultilineCustomInput = (props:any) => {
    const {
        placeholder,
        value,
        onChangeText,
        maxLength,
        multiline = false,
        numberOfLines = 1,
        containerStyle,
        inputStyle,
        characterCount,
        onBlur
    }=props
    return (
        <View style={{ gap: 4 }}>
            <TextInput
                style={[styles.input, inputStyle, { minHeight: multiline ? 100 : 44 }]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                maxLength={maxLength}
                onBlur={onBlur}
                multiline={multiline}
                numberOfLines={numberOfLines}
                placeholderTextColor={COLORS.Navy}
                textAlignVertical={multiline ? 'top' : 'center'}
                textAlign="left"
            />
            <Text style={styles.characterCount}>
                {maxLength - value.length} characters left
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: COLORS.white,
        borderRadius: 8,
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        color: COLORS.white,
        fontWeight: '400',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    characterCount: {
        fontSize: fontSize[12],
        fontFamily: FONTS.interRegular,
        fontWeight: '400',
        fontStyle: 'normal',
        color: COLORS.Navy200,
        alignSelf: 'flex-end',
    },
});

export default MultilineCustomInput;
