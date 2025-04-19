import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontSize } from "../config/themes/theme";

export const statusTabsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        justifyContent: 'space-between',
    },
    tab: {
        paddingVertical: 5,
        // paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: COLORS.Navy,
    },
    tabText: {
        fontSize: fontSize[12],
        color: COLORS.Navy,
        fontFamily: FONTS.interRegular,
        fontWeight: '400',
        textAlign: 'center',
    },
    activeTabText: {
        color: COLORS.Navy,
        fontFamily: FONTS.interSemiBold,
        fontWeight: '600',
    },
    contentContainer: {
        flex: 1,
    },
    content: {
        paddingBottom: 100,
        paddingTop: 16,
    },
}); 