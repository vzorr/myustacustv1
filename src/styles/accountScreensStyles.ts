import { StyleSheet } from 'react-native';
import { COLORS, FONTS, fontSize } from '../config/themes/theme';

const accountScreensStyles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: COLORS.white,
        padding: 20,
        gap: 24
    },
    basicInfoHeading: {
        fontSize: fontSize[24],
        fontFamily: FONTS.interSemiBold,
        fontWeight: "600",
        fontStyle: "normal",
        color: COLORS.Navy
    },
    subHeading: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: "400",
        fontStyle: "normal",
        color: COLORS.Navy200
    }
})
export default accountScreensStyles