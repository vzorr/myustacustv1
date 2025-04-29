// RepliedMessage.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../../../config/themes/theme';
import { SVGIcons } from '../../../../config/constants/svg';

interface RepliedMessageProps {
    message: {
        text: string;
        senderImage: string;
    };
    isCurrentUser: boolean;
}

const RepliedMessage: React.FC<RepliedMessageProps> = ({ message, isCurrentUser }) => {
    return (
        <View style={[
            styles.container,
            isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer
        ]}>
            <View style={styles.replyIndicator}>
                <SVGIcons.replayIcon width={14} height={14} />
            </View>
            <View style={styles.messageContent}>
                <Text style={styles.replyText}>Replying to</Text>
                <View style={styles.originalMessage}>
                    <Image
                        source={{ uri: message.senderImage }}
                        style={styles.smallUserImage}
                    />
                    <Text
                        style={styles.originalMessageText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {message.text}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        borderRadius: 8,
        marginBottom: 4,
        borderLeftWidth: 3,
    },
    currentUserContainer: {
        backgroundColor: COLORS.Navy100,
        borderLeftColor: COLORS.white,
    },
    otherUserContainer: {
        backgroundColor: COLORS.grey,
        borderLeftColor: COLORS.Navy,
    },
    replyIndicator: {
        position: 'absolute',
        left: 8,
        top: 8,
    },
    messageContent: {
        marginLeft: 20,
    },
    replyText: {
        fontSize: fontSize[12],
        color: COLORS.GreyedOut,
        marginBottom: 4,
    },
    originalMessage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallUserImage: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 6,
    },
    originalMessageText: {
        fontSize: fontSize[13],
        color: COLORS.GreyedOut,
        flexShrink: 1,
    },
});

export default RepliedMessage;