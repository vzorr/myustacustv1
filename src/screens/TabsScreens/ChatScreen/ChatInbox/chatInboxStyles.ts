import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontSize } from "../../../../config/themes/theme";

export const chatInboxStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    chatContainer: {
        flex: 1,
    },
    messagesList: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: COLORS.white,
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    currentUserRow: {
        justifyContent: 'flex-end',
    },
    otherUserRow: {
        justifyContent: 'flex-start',
    },
    messageContainer: {
        maxWidth: '85%',
        padding: 12,
        borderRadius: 12,
    },
    currentUserMessage: {
        backgroundColor: COLORS.Navy,
        borderBottomRightRadius: 0,
        marginLeft: 8,
    },
    otherUserMessage: {
        backgroundColor: COLORS.otherChatBgColor,
        borderBottomLeftRadius: 0,
        marginRight: 8,
    },
    messageText: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: "400",
        color: COLORS.Navy
    },
    currentUserMessageText: {
        color: COLORS.white,
    },
    messageTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 4,
    },
    messageTime: {
        fontSize: fontSize[10],
        color: COLORS.GreyedOut,
        marginRight: 4,
    },
    currentUserMessageTime: {
        color: 'rgba(255,255,255,0.7)',
    },
    messageStatus: {
        marginLeft: 4,
    },
    userImageContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: COLORS.grey,
        marginHorizontal: 4,
    },
    userImage: {
        width: '100%',
        height: '100%',
    },
    inputMainContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: COLORS.white,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: COLORS.inputBorder,
        minHeight: 44,
        backgroundColor: COLORS.white,
        paddingRight: 8,
    },
    recordingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingLeft: 8,
        gap: 4
    },
    recordingTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },
    recordingText: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: "400",
        color: COLORS.GreyedOut
    },
    recordingIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.ErrorRed
    },
    emojiContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingLeft: 8,
    },
    fileVoiceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 4,
        end: 4
    },
    iconButton: {
        padding: 4,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 8,
        paddingVertical: 8,
        maxHeight: 100,
    },
    lockContainer: {
        alignSelf: 'flex-end',
        marginEnd: 32,
        bottom: -6,
        zIndex: 2
    },
    btnContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.Navy,
        alignItems: 'center',
        justifyContent: 'center',
    },
    replyIconContainer: {
        position: 'absolute',
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        flexDirection: 'row',
    },
    currentUserReplyIcon: {
        right: 60,
    },
    otherUserReplyIcon: {
        right: 60,
    },
    replyIconText: {
        fontSize: fontSize[12],
        marginLeft: 4,
        color: COLORS.Navy,
    },
    replyPreviewContainer: {
        padding: 8,
        borderRadius: 6,
        marginBottom: 8,
    },
    currentUserReplyPreview: {
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    otherUserReplyPreview: {
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    replyPreviewContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    replyPreviewLine: {
        width: 3,
        height: 30,
        borderRadius: 2,
        marginRight: 8,
    },
    currentUserReplyPreviewLine: {
        backgroundColor: COLORS.white,
    },
    otherUserReplyPreviewLine: {
        backgroundColor: COLORS.Navy,
    },
    replyPreviewTextContainer: {
        flex: 1,
    },
    replyPreviewSender: {
        fontSize: fontSize[12],
        fontWeight: 'bold',
        marginBottom: 2,
    },
    currentUserReplyPreviewSender: {
        color: COLORS.white,
    },
    otherUserReplyPreviewSender: {
        color: COLORS.Navy,
    },
    replyPreviewText: {
        fontSize: fontSize[12],
    },
    currentUserReplyPreviewText: {
        color: 'rgba(255,255,255,0.7)',
    },
    otherUserReplyPreviewText: {
        color: COLORS.GreyedOut,
    },
    replyBar: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: COLORS.otherChatBgColor
    },
    replyBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    replyBarLine: {
        width: 4,
        height: 50,
        borderRadius: 2,
        marginRight: 10
    },
    currentUserReplyLine: {
        backgroundColor: COLORS.Navy,
    },
    otherUserReplyLine: {
        backgroundColor: COLORS.Navy100,
    },
    replyingToContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8
    },
    replyBarTitle: {
        fontSize: fontSize[12],
        fontFamily: FONTS.interRegular,
        color: COLORS.Navy200,
        fontWeight: '400'
    },
    replyMessageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    replyUserImageContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: 'hidden',
        marginRight: 8,
    },
    replyUserImage: {
        width: '100%',
        height: '100%',
    },
    replyTextContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 8,
        borderBottomLeftRadius: 0,
    },
    replyBarMessage: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: '400',
        color: COLORS.Navy,
    },
    replyBarTime: {
        fontSize: fontSize[10],
        color: COLORS.GreyedOut,
        marginTop: 2,
        alignSelf: 'flex-end',
    },
});