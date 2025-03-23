import { StyleSheet } from 'react-native';

const splashScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: 'rgba(35, 35, 35, 0.7)',
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#FFF',
    },
    secondaryButton: {
        backgroundColor: '#FFF',
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
        backgroundColor: '#FFF',
    },
    orText: {
        color: '#FFF',
        // fontFamily: 'Inter',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 14,
        marginHorizontal: 10,
    },
});

export default splashScreenStyles;