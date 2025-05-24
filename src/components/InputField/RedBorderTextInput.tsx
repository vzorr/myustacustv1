import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, fontSize } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';

interface Props {
    placeholder?: string;
    error?: string;
    containerStyle?: object;
    handleClear?: () => void;
    value?: string;
    handleOnChangeText?: (text: string) => void;
}

const RedBorderTextInput: React.FC<Props> = ({ placeholder = 'Enter text', error, containerStyle, handleClear, value, handleOnChangeText }) => {

    return (
        <View style={styles.wrapper}>
            <View style={[styles.inputContainer, containerStyle]}>
                <TextInput
                    value={value}
                    onChangeText={handleOnChangeText}
                    placeholder={placeholder}
                    style={styles.input}
                    placeholderTextColor={COLORS.Navy}
                />
                {/* {value.length > 0 && ( */}
                <TouchableOpacity onPress={handleClear}>
                    <SVGIcons.crossIcon />
                </TouchableOpacity>
                {/* )} */}
            </View>
            <View style={{ width: "90%" }}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        </View>
    );
};

export default RedBorderTextInput;

const styles = StyleSheet.create({
    wrapper: {
        // marginVertical: 10,
    },
    inputContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.ErrorRed,
        borderRadius: 8,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 45,
        fontSize: fontSize[14],
        color: COLORS.Navy,
    },
    errorText: {
        color: COLORS.ErrorRed,
        marginTop: 2,
        fontSize: fontSize[12],
        fontFamily: FONTS.interRegular,
        marginLeft: 6,
    },
});
