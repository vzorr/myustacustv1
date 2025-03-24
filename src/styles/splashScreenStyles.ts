import { StyleSheet } from 'react-native';
import { COLORS } from '../config/themes/theme';

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
    // logoText: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     color: '#fff',
    // },
    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: COLORS.btnBgWhiteColor,
    },
    secondaryButton: {
        backgroundColor: COLORS.btnBgWhiteColor,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginVertical: 8,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.btnBgWhiteColor,
    },
    orText: {
        color: COLORS.btnBgWhiteColor,
        // fontFamily: 'Inter',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 14,
        marginHorizontal: 10,
    },
});

export default splashScreenStyles;