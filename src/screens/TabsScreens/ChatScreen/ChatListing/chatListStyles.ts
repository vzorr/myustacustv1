


import { Dimensions, Platform, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONTS, fontSize } from "../../../../config/themes/theme";

const { height, width } = Dimensions.get('window')
export const chatListStyle = StyleSheet.create({
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
        justifyContent: 'center',
    },
    imageMainView: {
        height: 50,
        width: 50,
        borderRadius: 35,
        backgroundColor: COLORS.grey
    },
    chatListCardMain: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    contentContainer: {
        marginStart: 8,
        flex: 1,
    },
    jobTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: COLORS.lightSky,
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 4,
        maxWidth: '100%',
        marginBottom: 2,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        fontSize: hp(1.6),
        fontFamily: FONTS.interRegular,
        color: COLORS.ErrorRed,
        marginLeft: -20,
        opacity: 0.8,
    },
    recordingText: {
        fontSize: hp(1.6),
        fontFamily: FONTS.interRegular,
        color: COLORS.ErrorRed,
        opacity: 0.8,
    },
    jobTitle: {
        fontSize: fontSize[10],
        fontFamily: FONTS.interRegular,
        color: COLORS.Navy200,
        fontWeight: '400',
        marginStart: 3,
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
})