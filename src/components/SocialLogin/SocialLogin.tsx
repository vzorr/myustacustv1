import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';

interface socialLoginProps {
    title: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    loginType?: 'google' | 'Apple';
}
const handleOnPress = () => {
    console.log('Social login pressed');
}

const SocialLogin: React.FC<socialLoginProps> = ({ title, style, textStyle, loginType }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={handleOnPress}>
        {loginType === 'google' ? <SVGIcons.Google /> : <SVGIcons.Apple />}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: 44,
        margin: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: COLORS.Yellow,
    },
    buttonText: {
        fontFamily: FONTS.interMedium,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        color: COLORS.Navy,
        textAlignVertical: 'center',
        marginStart: 8,
    },
});

export default SocialLogin;