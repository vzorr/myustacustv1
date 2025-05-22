import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TextInputProps, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, fontSize, SIZES } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';
interface InputProps extends TextInputProps {
    isPassword?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    cursorColor?: string;
    basicInfo?: string
}
const CustomSearchInput: React.FC<InputProps> = ({ isPassword, basicInfo, cursorColor = COLORS.white, containerStyle, inputStyle, ...props }) => {

    return (
        <View style={StyleSheet.flatten([styles.container, containerStyle])}>
            <View style={styles.IconContainer}>
                <SVGIcons.searchIcon />
            </View>
            <TextInput
                style={StyleSheet.flatten([styles.input, inputStyle])}
                cursorColor={COLORS.Navy}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: SIZES.hp(6.1),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        paddingHorizontal: 12,
        gap: 4,
    },
    input: {
        flex: 1,
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: '400',
        paddingVertical: 0,
    },
    IconContainer: {
    },
});

export default CustomSearchInput;
