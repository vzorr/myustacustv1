import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../../../../config/themes/theme';

interface ReplySelfMessageProps {
    message: {
        text: string;
        timestamp: string;
        senderImage: string;
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

const ReplySelfMessage: React.FC<ReplySelfMessageProps> = ({
    message,
    repliedMessage,
    formatTime,
    onProfilePress,
    currentUserId,
    userName
}) => {
    return (
        <View style={styles.messageRow}>
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
            <TouchableOpacity style={styles.userImageContainer} onPress={onProfilePress}>
                <Image
                    source={{ uri: message.senderImage }}
                    style={styles.userImage}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 8,
        justifyContent: 'flex-end',
    },
    messageContainer: {
        maxWidth: '85%',
        minWidth: "60%",
        padding: 12,
        borderRadius: 12,
        backgroundColor: COLORS.Navy,
        borderBottomRightRadius: 0,
        marginLeft: 8,
    },
    replyPreviewContainer: {
        padding: 4,
        borderRadius: 6,
        marginBottom: 4,
        backgroundColor: COLORS.Navy200
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
        color: COLORS.white,
    },
    replyPreviewText: {
        fontSize: fontSize[12],
        color: COLORS.lightWhite,
    },
    messageText: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: "400",
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
        color: 'rgba(255,255,255,0.7)',
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

export default ReplySelfMessage; 