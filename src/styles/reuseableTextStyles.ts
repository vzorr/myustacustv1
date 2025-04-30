import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontSize } from "../config/themes/theme";

export const reuseableTextStyles = StyleSheet.create({
    title: {
        fontSize: fontSize[24],
        fontFamily: FONTS.interSemiBold,
        fontWeight: '600',
        fontStyle: 'normal',
        color: COLORS.Navy,
    },
    subTitle: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: '400',
        fontStyle: 'normal',
        color: COLORS.Navy200,
    },
    chatHeaderTitle: {
        fontSize: fontSize[16],
        fontFamily: FONTS.interSemiBold,
        fontWeight: '600',
        fontStyle: 'normal',
        color: COLORS.white,
    },
    chatStatus: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interMedium,
        fontWeight: '400',
        fontStyle: 'normal',
        color: COLORS.Yellow,
    }
});