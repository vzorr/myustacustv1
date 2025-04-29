// OtherMessage.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../../../config/themes/theme';

interface OtherMessageProps {
    message: {
        id: string;
        text: string;
        timestamp: string;
        receiverImage: string;
    };
}

const OtherMessage: React.FC<OtherMessageProps> = ({ message }) => {
    const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return (
        <View style={styles.messageRow}>
            <View style={styles.userImageContainer}>
                <Image
                    source={{ uri: message.receiverImage }}
                    style={styles.userImage}
                />
            </View>
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.messageTime}>
                    {formattedTime}
                </Text>
            </View>
        </View>
    );
};
export default OtherMessage;
const styles = StyleSheet.create({
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 10,
        justifyContent: 'flex-start',
    },
    messageContainer: {
        maxWidth: '85%',
        padding: 12,
        borderRadius: 12,
        backgroundColor: COLORS.otherChatBgColor,
        borderBottomLeftRadius: 0,
        marginRight: 8,
    },
    messageText: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: "400",
        color: COLORS.Navy,
    },
    messageTime: {
        fontSize: fontSize[10],
        fontFamily: FONTS.interMedium,
        fontWeight: "500",
        color: COLORS.GreyedOut,
        textAlign: 'right',
        marginTop: 5,
    },
    userImageContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: COLORS.grey,
        marginHorizontal: 4,
    },
    userImage: {
        width: '100%',
        height: '100%',
    },
});