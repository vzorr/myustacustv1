import { StyleSheet } from 'react-native';
import { COLORS, FONTS, fontSize, SIZES } from '../config/themes/theme';

export const locationScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    bottom: {
        backgroundColor: COLORS.white,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // justifyContent: 'space-between',
        // width: "100%",
        height: SIZES.hp(6.1),
        backgroundColor: COLORS.white,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    locationTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    searchText: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: '400',
        color: COLORS.Navy200,
        fontStyle: 'normal',
        textAlign: 'left'
    },

})