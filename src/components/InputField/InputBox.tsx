import React from 'react';
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';
import { COLORS, FONTS } from '../../config/themes/theme';

const CustomTextInput: React.FC<TextInputProps> = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                {...props}
            />
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
});

export default CustomTextInput;
