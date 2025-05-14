import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontSize, SIZES } from "../../../config/themes/theme";

export const notiiStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    notiContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 20
    },
    contentContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
        // gap: 16,
        flex: 1,
        backgroundColor: COLORS.white,
    },
    statusHeaderContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        gap: 4,
    },
    chatListingMain: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    chatInboxMain: {
        flex: 1,
        backgroundColor: COLORS.white
    },

    cardBackGroundColor: {
        backgroundColor: "#D2FDEBDC"
    },
    cardBackGroundColor1: {
        backgroundColor: COLORS.white
    },
    imageView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    imageMainView: {
        height: 50,
        width: 50,
        borderRadius: 35,
        backgroundColor: COLORS.Navy200
    },
    chatListCardMain: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 20,
        // alignItems: 'center',
    },
    cardContentContainer: {
        marginStart: 8,
        flex: 1,
        gap: 2
    },
    userNameText: {
        flex: 1,
        fontSize: fontSize[14],
        fontFamily: FONTS.interSemiBold,
        color: COLORS.Navy,
        fontWeight: '600',
        marginRight: 8,
    },
    lastMsgContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lastMsg: {
        flex: 1,
        fontSize: fontSize[12],
        fontFamily: FONTS.interRegular,
        color: COLORS.Navy200,
        fontWeight: '400',
        marginRight: 8,
    },
    rightView: {
        position: 'absolute',
        right: 0,
        bottom: -10,
        justifyContent: 'flex-end',
        marginRight: 12,
    },
    cancelTxt: {
        fontSize: SIZES.hp(1.6),
        fontFamily: FONTS.interRegular,
        color: COLORS.ErrorRed,
        marginLeft: -20,
        opacity: 0.8,
    },
    recordingText: {
        fontSize: SIZES.hp(1.6),
        fontFamily: FONTS.interRegular,
        color: COLORS.ErrorRed,
        opacity: 0.8,
    },
    notiiText: {
        fontSize: fontSize[12],
        fontFamily: FONTS.interRegular,
        color: COLORS.Navy,
        fontWeight: '400',
        // marginStart: 2,
        flexShrink: 1,
        overflow: 'hidden',
    },
    dateText: {
        fontSize: fontSize[10],
        fontFamily: FONTS.interRegular,
        color: COLORS.GreyedOut,
        fontWeight: '400',
    },
    countContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 10,
        borderColor: COLORS.ErrorRed
    },
    countView: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.Yellow,
        alignItems: "center",
        justifyContent: "center",
    },
    isOnlineView: {
        height: 10,
        width: 10,
        backgroundColor: "green",
        borderRadius: 5,
        position: "absolute",
        right: 2,
        bottom: 5
    },
    counntText: {
        fontSize: fontSize[10],
        fontFamily: FONTS.interMedium,
        color: COLORS.Navy,
        textAlign: "center",
    },

    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    tab: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: 4
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
    dotStyle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.Yellow
    },
    activeTabText: {
        color: COLORS.Navy,
        fontFamily: FONTS.interSemiBold,
        fontWeight: '600',
    },
    tabContentContainer: {
        flex: 1,
    },
    content: {
        paddingBottom: 100,
        paddingTop: 16,
    },
})