import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TextInputProps, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';
interface CustomTextInputProps extends TextInputProps {
    isPassword?: boolean;
}
const CustomTextInput: React.FC<CustomTextInputProps> = ({ isPassword, ...props }) => {
    const [secureText, setSecureText] = useState(isPassword);
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                secureTextEntry={secureText}
                {...props}
            />
            {isPassword && (
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setSecureText(!secureText)}
                >
                    <SVGIcons.eyeicon />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 44,
        margin: 8,
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
        paddingStart: 10,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
    },
});

export default CustomTextInput;
