import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../config/themes/theme';

const splashScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.bgImgColor,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: COLORS.white,
    },
    secondaryButton: {
        backgroundColor: COLORS.white,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginVertical: 4,
        alignSelf: 'center'
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.white,
    },
    orText: {
        color: COLORS.white,
        fontFamily: FONTS.interRegular,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 14,
        marginHorizontal: 10,
    },
});

export default splashScreenStyles;