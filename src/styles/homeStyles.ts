import { Platform, StatusBar, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../config/themes/theme";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        backgroundColor: COLORS.Navy,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        gap: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 12,
        borderBottomStartRadius: 16,
        borderBottomEndRadius: 16,
        minHeight: 100
    },
    menuButton: {
        padding: 8,
    },
    logoContainer: {
        alignItems: 'center',
    },
    notificationButton: {
        padding: 8,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: COLORS.Yellow,
        borderRadius: 10,
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationBadgeText: {
        color: COLORS.Navy,
        fontSize: 10,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 80, // Add padding for bottom tab
        paddingHorizontal: 20,
        paddingVertical: 16
    },
    categoriesContainer: {
        paddingVertical: 16,
        gap: 8,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZES.wp(35),
        height: SIZES.hp(6),
        borderWidth: 1,
        borderRadius: 36,
        borderColor: COLORS.inputBorder,
        gap: 8
    },
    categoryLabel: {
        fontSize: 12,
        color: COLORS.Navy,
        textAlign: 'center',
    },
    sectionContainer: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.Navy,
        marginBottom: 16,
    },
    professionCard: {
        backgroundColor: COLORS.skyBlue,
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        height: 130,
    },
    professionInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    professionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 16,
    },
    professionCountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    professionCount: {
        fontSize: 14,
        color: COLORS.white,
        marginRight: 8,
    },
    professionImageContainer: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    professionImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    dryWalImage: {
        width: 130,
        height: 130,
        resizeMode: 'contain',
        marginTop: -35
    },
})