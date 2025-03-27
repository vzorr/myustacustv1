import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS, FONTS } from '../config/themes/theme';

const ErrorText = (props: any) => {
    const { error } = props
    return (
        <Text style={styles.errorText}>{error}</Text>
    )
}
const styles = StyleSheet.create({
    errorText: {
        fontSize: 12,
        fontFamily: FONTS.interMedium,
        color: COLORS.ErrorRed,
        marginBottom: 5,
        marginTop: -2,
        marginStart: 25,
        alignSelf: "flex-start"
    }
});

export default ErrorText