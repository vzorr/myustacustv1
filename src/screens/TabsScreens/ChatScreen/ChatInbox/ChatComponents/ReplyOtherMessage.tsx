import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../../../../config/themes/theme';

interface ReplyOtherMessageProps {
    message: {
        text: string;
        timestamp: string;
        receiverImage: string;
        replyTo: string;
    };
    repliedMessage: {
        text: string;
        senderId: string;
    };
    formatTime: (timestamp: string) => string;
    onProfilePress: () => void;
    currentUserId: string;
    userName: string;
}

const ReplyOtherMessage: React.FC<ReplyOtherMessageProps> = ({
    message,
    repliedMessage,
    formatTime,
    onProfilePress,
    currentUserId,
    userName
}) => {
    return (
        <View style={styles.messageRow}>
            <TouchableOpacity style={styles.userImageContainer} onPress={onProfilePress}>
                <Image
                    source={{ uri: message.receiverImage }}
                    style={styles.userImage}
                />
            </TouchableOpacity>
            <View style={styles.messageContainer}>
                <View style={styles.replyPreviewContainer}>
                    <View style={styles.replyPreviewContent}>
                        <View style={styles.replyPreviewLine} />
                        <View style={styles.replyPreviewTextContainer}>
                            <Text style={styles.replyPreviewSender}>
                                {repliedMessage.senderId === currentUserId ? 'You' : userName}
                            </Text>
                            <Text style={styles.replyPreviewText} numberOfLines={1}>
                                {repliedMessage.text}
                            </Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.messageText}>{message.text}</Text>
                <View style={styles.messageTimeContainer}>
                    <Text style={styles.messageTime}>
                        {formatTime(message.timestamp)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 8,
        justifyContent: 'flex-start',
    },
    messageContainer: {
        maxWidth: '85%',
        minWidth: "60%",
        padding: 12,
        borderRadius: 12,
        backgroundColor: COLORS.otherChatBgColor,
        borderBottomLeftRadius: 0,
        marginRight: 8,
    },
    replyPreviewContainer: {
        padding: 4,
        borderRadius: 6,
        marginBottom: 4,
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
        backgroundColor: COLORS.Navy100,
    },
    replyPreviewTextContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    replyPreviewSender: {
        fontSize: fontSize[12],
        fontWeight: 'bold',
        color: COLORS.Navy200,
    },
    replyPreviewText: {
        fontSize: fontSize[12],
        color: COLORS.Navy200,
    },
    messageText: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: "400",
        color: COLORS.Navy,
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
});

export default ReplyOtherMessage; 