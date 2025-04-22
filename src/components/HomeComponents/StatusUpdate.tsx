import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { SVGIcons } from '../../config/constants/svg';
import { COLORS, FONTS, fontSize } from '../../config/themes/theme';

interface StatusUpdateProps {
    text: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
    isArrow?: boolean;
}

const StatusUpdate: React.FC<StatusUpdateProps> = ({ text, textColor, bgColor, borderColor, isArrow = true }) => {
    return (
        <View style={styles.updateContainer}>
            <View style={[styles.statusUpdateContainer, { backgroundColor: bgColor, borderColor }]}>
                <Text style={[styles.statusBtnText, { color: textColor, textTransform:"capitalize" }]}>{text}</Text>
            </View>
            {isArrow && <SVGIcons.rightArrow />}
        </View>
    );
};

export default StatusUpdate;

const styles = StyleSheet.create({
    updateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    statusUpdateContainer: {
        backgroundColor: COLORS.statusBtnBgColor,
        paddingHorizontal: 9,
        paddingVertical: 5,
        // height: 24,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.statusBtnBorderColor
    },
    statusBtnText: {
        fontSize: fontSize[12],
        color: COLORS.statusBtnBorderColor,
        fontFamily: FONTS.interMedium,
        fontStyle: 'normal',
        fontWeight: '500'
    },
});
