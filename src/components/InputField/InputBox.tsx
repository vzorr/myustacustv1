import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TextInputProps, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';
interface CustomTextInputProps extends TextInputProps {
    isPassword?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    cursorColor?: string;
    basicInfo?: string
}
const CustomTextInput: React.FC<CustomTextInputProps> = ({ isPassword, basicInfo, cursorColor = COLORS.white, containerStyle, inputStyle, ...props }) => {
    const [secureText, setSecureText] = useState(isPassword);

    const toggleSecureText = () => {
        setSecureText(!secureText);
    };
    return (
        <View style={StyleSheet.flatten([styles.container, containerStyle])}>
            <TextInput
                style={StyleSheet.flatten([styles.input, inputStyle])}
                secureTextEntry={secureText}
                cursorColor={cursorColor}
                {...props}
            />
            {isPassword && (
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={toggleSecureText}
                    activeOpacity={0.7}
                >
                    {basicInfo !== "basicInfo" ? (
                        secureText ?
                            <SVGIcons.EyeWhiteIcon />
                            :
                            <SVGIcons.EyeHideWhiteIcon />
                    ) : (
                        secureText ?
                            <SVGIcons.eyeicon />
                            :
                            <SVGIcons.hideEyeIcon />
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: SIZES.hp(6.1),
        gap: 8,
        justifyContent: 'center',
        borderRadius: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.white,
        borderRadius: 8,
        fontSize: 14,
        fontFamily: FONTS.interRegular,
        color: COLORS.white,
        fontWeight: '400',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
    },
});

export default CustomTextInput;
