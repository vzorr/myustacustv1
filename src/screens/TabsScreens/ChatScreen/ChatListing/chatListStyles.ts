


import { Dimensions, Platform, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONTS, fontSize } from "../../../../config/themes/theme";

const { height, width } = Dimensions.get('window')
export const chatListStyle = StyleSheet.create({
    chatListingMain: {
        flex: 1,
        // paddingHorizontal: 10,
        backgroundColor: COLORS.white
    },
    chatInboxMain: {
        flex: 1,
        // paddingHorizontal: 10,
        backgroundColor: COLORS.white
    },
    chatListCardMain: {
        // paddingTop: 8,
        // marginTop: 10,
        // backgroundColor: 'blue',
        // paddingBottom: 5

    },

    cardBackGroundColor: {
        backgroundColor: "#D2FDEBDC"
    },
    cardBackGroundColor1: {
        backgroundColor: COLORS.white
    },
    chatListInner: {
        // flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 12,
        // justifyContent: "space-between"
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
        // borderWidth: 1,
        // borderColor: COLORS.Yellow

    },
    rightView: {
        position: 'absolute',
        right: 0,
        bottom: -10,
        justifyContent: 'flex-end',
        marginRight: 12,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userNameText: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interSemiBold,
        color: COLORS.Navy,
        fontWeight: '600',
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
    lastMsgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    lastMsg: {
        fontSize: hp(1.8),
        fontFamily: FONTS.interSemiBold,
        color: COLORS.Black,
        opacity: 0.5,
        width: wp(70)
    },
    dateText: {
        fontSize: fontSize[10],
        fontFamily: FONTS.interRegular,
        color: COLORS.GreyedOut,
        fontWeight: '400',
        width: "40%"
    },
    countView: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.Yellow,
        alignItems: "center",
        // alignSelf: "flex-end",
        justifyContent: "center",
    },
    isOnlineView: {
        height: 10,
        width: 10,
        backgroundColor: "green",
        borderRadius: 5,
        position: "absolute",
        marginStart: 5
    },
    counntText: {
        fontSize: fontSize[10],
        fontFamily: FONTS.interMedium,
        color: COLORS.Navy,
        textAlign: "center",
        // margin: 5
    },
    InboxImageView: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    InboxImageMainView: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.Black,
        marginStart: 8,
        backgroundColor: COLORS.white
    },
    chatHeaderIcon: {
        marginStart: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    inboxHeaderTxtView: {
        justifyContent: "center",
        marginStart: 8
    },
    inboxHeaderTxt: {
        fontSize: hp(1.9),
        fontFamily: FONTS.interSemiBold,
        color: COLORS.white,
    },
    inboxheaderRightIcon: {
        justifyContent: "center",
        marginRight: 12
    },
    dropDownStyle: {
        backgroundColor: COLORS.white,
        position: "absolute",
        right: 20,
        top: 40,
        padding: 6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1
    },
    inboxHeaderMainView: {
        paddingVertical: 10,
        backgroundColor: COLORS.Yellow,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    selfMsgView: {
        maxWidth: "49%",
        padding: 8,
        alignSelf: "flex-end",
        marginRight: 12,
        backgroundColor: "#CEDDF0",
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        marginTop: 10
    },
    selfMsgtriangle: {
        position: 'absolute',
        bottom: -10,
        right: 8,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 20,
        borderTopWidth: 20,
        borderRightColor: 'transparent',
        borderTopColor: "#CEDDF0",
        transform: [{ rotate: '45deg' }],
    },
    audioPlayer: {
        width: width * 0.60,
        paddingHorizontal: 8,
        paddingTop: 12,
        paddingBottom: 6,
        alignSelf: "flex-end",
        marginRight: 12,
        backgroundColor: "#CEDDF0",
        borderBottomLeftRadius: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginTop: 12,
        justifyContent: "center"
    },
    selfAudioPlayer: {
        position: 'absolute',
        bottom: -10,
        right: -3,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 20,
        borderTopWidth: 20,
        borderRightColor: 'transparent',
        borderTopColor: "#CEDDF0",
        transform: [{ rotate: '45deg' }],
    },
    audioPlayerOther: {
        width: width * 0.60,
        paddingHorizontal: 8,
        paddingTop: 12,
        paddingBottom: 6,
        alignSelf: "flex-start",
        marginLeft: 12,
        backgroundColor: "#E2E7E8",
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        marginTop: 12,
        justifyContent: "center"
    },
    otherAudioPlayer: {
        position: 'absolute',
        bottom: -10,
        left: -3,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 20,
        borderTopWidth: 20,
        borderRightColor: 'transparent',
        borderTopColor: "#E2E7E8",
        transform: [{ rotate: '45deg' }],
    },
    timerText: {
        fontSize: hp(1.5),
        fontFamily: FONTS.interRegular,
        color: COLORS.Black,
        textAlign: "right",
        marginRight: 4
    },
    otherMsgView: {
        maxWidth: "49%",
        padding: 8,
        alignSelf: "flex-start",
        marginStart: 12,
        backgroundColor: '#E2E7E8',
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        marginTop: 10
    },
    otherMsgtriangle: {
        position: 'absolute',
        bottom: -10,
        left: 8,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 20,
        borderTopWidth: 20,
        borderRightColor: 'transparent',
        borderTopColor: '#E2E7E8',
        transform: [{ rotate: '45deg' }],
    },

    selfOtherMsgTxt: {
        fontSize: hp(1.5),
        fontFamily: FONTS.interRegular,
        color: COLORS.Navy,
        marginBottom: 4
    },
    selfOtherDateTxt: {
        fontSize: hp(1),
        fontFamily: FONTS.interRegular,
        color: COLORS.Navy,
        opacity: 0.8,
    },
    dateMainView: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    chatImageView: {
        width: "49%",
        padding: 8,
        alignSelf: "flex-end",
        marginRight: 12,
        backgroundColor: "#CEDDF0",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginTop: 10
    },
    selfVideoAndImage: {
        position: 'absolute',
        bottom: -10,
        right: -4,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 20,
        borderTopWidth: 20,
        borderRightColor: 'transparent',
        borderTopColor: "#CEDDF0",
        transform: [{ rotate: '45deg' }],
    },
    chatImage: {
        width: "100%",
        height: hp(25),
        padding: 8,
        marginRight: 12,
        backgroundColor: COLORS.white,
    },
    videoPlayerStyle: {
        width: "100%",
        height: hp(20),
        backgroundColor: COLORS.white,
    },
    chatImageOtherView: {
        width: "49%",
        padding: 8,
        marginLeft: 12,
        backgroundColor: "#E2E7E8",
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        marginTop: 10
    },
    otherVideoAndImage: {
        position: 'absolute',
        bottom: -10,
        left: -4,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 20,
        borderTopWidth: 20,
        borderRightColor: 'transparent',
        borderTopColor: "#E2E7E8",
        transform: [{ rotate: '45deg' }],
    },
    chatImageOther: {
        width: "100%",
        height: hp(25),
        padding: 8,
        marginRight: 12,
        backgroundColor: COLORS.white,
    },
    InboxInputContainer: {
        borderColor: '#888888',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginStart: 5,
        width: "100%",
        backgroundColor: COLORS.white,
        flexDirection: "row",
        alignItems: 'center',
    },
    inboxInputField: {
        borderColor: '#888888',
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === "ios" ? 15 : 7,
        width: "94%",
        alignSelf: 'center',
        color: COLORS.Yellow,
    },
    reportBlockTxt: {
        fontSize: hp(2),
        fontFamily: FONTS.interRegular,
        color: COLORS.Yellow,
        opacity: 0.8
    },
    playIconView: {
        position: "absolute",
        height: 50,
        width: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        alignSelf: "center",
        top: Platform.OS === 'ios' ? "40%" : "30%"
    },
    selfCallView: {
        width: "50%",
        padding: 5,
        alignSelf: "flex-end",
        // justifyContent: 'center',
        marginRight: 12,
        backgroundColor: "#CEDDF0",
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        marginTop: 10
    },
    otherCallView: {
        width: "50%",
        padding: 5,
        marginStart: 12,
        alignSelf: "flex-start",
        backgroundColor: '#E2E7E8',
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        marginTop: 10
    },
    otherCallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        marginTop: 10
    },
    callView: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        marginStart: 10
    },
    selfOtherCallTxt: {
        fontSize: hp(1.3),
        fontFamily: FONTS.interSemiBold,
        color: COLORS.Navy,
        paddingVertical: 3,
        marginStart: 10
    },
    selfOtherDeleteMsgTxt: {
        fontSize: hp(1.5),
        fontFamily: FONTS.interSemiBold,
        color: COLORS.Navy,
        marginLeft: 3
    },
})