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
    paddingHorizontal: 4,
    paddingVertical: 8,
    flexGrow: 1,
  },
  inputMainContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 48,
  },
  attachmentButton: {
    padding: 8,
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: fontSize[14],
    fontFamily: FONTS.interRegular,
    color: COLORS.Navy,
    maxHeight: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.Navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  voiceButton: {
    padding: 8,
    marginLeft: 4,
  },
  replyBar: {
    backgroundColor: COLORS.otherChatBgColor,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  replyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyLine: {
    width: 3,
    height: 40,
    backgroundColor: COLORS.Navy,
    marginRight: 12,
  },
  replyText: {
    flex: 1,
  },
  replyLabel: {
    fontSize: fontSize[12],
    fontFamily: FONTS.interMedium,
    color: COLORS.Navy200,
    marginBottom: 2,
  },
  replyMessage: {
    fontSize: fontSize[12],
    fontFamily: FONTS.interRegular,
    color: COLORS.Navy,
  },
  typingIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingText: {
    fontSize: fontSize[12],
    fontFamily: FONTS.interRegular,
    color: COLORS.GreyedOut,
    fontStyle: 'italic',
  },
  connectionBanner: {
    backgroundColor: COLORS.Navy200,
    paddingVertical: 8,
    alignItems: 'center',
  },
  connectionText: {
    fontSize: fontSize[12],
    fontFamily: FONTS.interMedium,
    color: COLORS.white,
  },
  blockedBanner: {
    backgroundColor: COLORS.ErrorRed,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockedText: {
    fontSize: fontSize[12],
    fontFamily: FONTS.interMedium,
    color: COLORS.white,
    marginLeft: 8,
  },
});



/*import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontSize } from "../../../../config/themes/theme";

export const chatInboxStyles = StyleSheet.create({

    emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
emptyText: {
    fontSize: fontSize[14],
    fontFamily: FONTS.interRegular,
    color: COLORS.Navy200,
    textAlign: 'center',
},
loadingMoreContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
},
loadingMoreText: {
    marginLeft: 8,
    fontSize: fontSize[12],
    color: COLORS.Navy200,
},
failedMessageContainer: {
    alignSelf: 'center',
    marginVertical: 8,
    padding: 8,
    backgroundColor: 'rgba(253, 76, 79, 0.1)',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
},
failedMessageText: {
    fontSize: fontSize[12],
    fontFamily: FONTS.interRegular,
    color: COLORS.ErrorRed,
},
resendButton: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: COLORS.Yellow,
    borderRadius: 4,
},
resendButtonText: {
    fontSize: fontSize[12],
    fontFamily: FONTS.interMedium,
    color: COLORS.Navy,
},
blockedBanner: {
    backgroundColor: COLORS.ErrorRed,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
},
blockedText: {
    fontSize: fontSize[12],
    fontFamily: FONTS.interMedium,
    color: COLORS.white,
    marginLeft: 8,
},
connectionBanner: {
    backgroundColor: COLORS.Navy200,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
},
connectionText: {
    fontSize: fontSize[12],
    fontFamily: FONTS.interMedium,
    color: COLORS.white,
},

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
        marginBottom: 8,
    },
    currentUserRow: {
        justifyContent: 'flex-end',
    },
    otherUserRow: {
        justifyContent: 'flex-start',
    },
    messageContainer: {
        maxWidth: '85%',
        minWidth: "60%",
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
        // paddingTop: 10,
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
        padding: 4,
        borderRadius: 6,
        marginBottom: 4,
    },
    currentUserReplyPreview: {
        backgroundColor: COLORS.Navy200
    },
    otherUserReplyPreview: {
        backgroundColor: COLORS.white
    },
    replyPreviewContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    replyPreviewLine: {
        width: 4,
        height: 40,
        borderRadius: 22,
        marginRight: 8,
    },
    currentUserReplyPreviewLine: {
        backgroundColor: COLORS.Navy100,
    },
    otherUserReplyPreviewLine: {
        backgroundColor: COLORS.Navy100,
    },
    replyPreviewTextContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    replyPreviewSender: {
        fontSize: fontSize[12],
        fontWeight: 'bold',
        // marginBottom: 2,
    },
    currentUserReplyPreviewSender: {
        color: COLORS.white,
    },
    otherUserReplyPreviewSender: {
        color: COLORS.Navy200,
    },
    replyPreviewText: {
        fontSize: fontSize[12],
    },
    currentUserReplyPreviewText: {
        color: COLORS.lightWhite,
    },
    otherUserReplyPreviewText: {
        color: COLORS.Navy200,
    },
    replyBar: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: COLORS.otherChatBgColor,
    },
    replyBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 8
    },
    replyBarLine: {
        width: 4,
        height: 41,
        borderRadius: 2,
        marginRight: 8
    },
    currentUserReplyLine: {
        backgroundColor: COLORS.Navy100,
    },
    otherUserReplyLine: {
        backgroundColor: COLORS.Navy100,
    },
    replyingToContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10
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
        paddingHorizontal: 12,
        paddingVertical: 8,
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
    imageGridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 4,
        gap: 8
    },
    singleImageItem: {
        width: 200,
        height: 200,
    },
    multiImageItem: {
        width: 124,
        height: 124,
    },
    attachmentImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    fileAttachmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.grey,
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        maxWidth: 200,
    },
    fileName: {
        marginLeft: 8,
        color: COLORS.Navy,
        flexShrink: 1,
    },
    audioAttachmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.grey,
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    audioDuration: {
        marginLeft: 8,
        color: COLORS.Navy,
    },
    attachmentsPreviewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: COLORS.otherChatBgColor,
    },
    attachmentPreview: {
        borderRadius: 8,
        overflow: 'hidden',
        width: 72,
        height: 72,
        position: 'relative',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    removeAttachmentButton: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.Navy,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    previewFile: {
        width: 80,
        height: 80,
        borderRadius: 4,
        backgroundColor: COLORS.grey,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    previewFileName: {
        marginTop: 4,
        fontSize: fontSize[12],
        textAlign: 'center',
    },
    previewAudio: {
        width: 80,
        height: 80,
        borderRadius: 4,
        backgroundColor: COLORS.grey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewAudioDuration: {
        marginTop: 4,
        fontSize: fontSize[12],
    },
    multiImageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    imageCounterText: {
        fontSize: 10,
        color: COLORS.GreyedOut,
        textAlign: 'center',
        marginTop: 4,
    },


});
*/

