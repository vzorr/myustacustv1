import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../../../../config/themes/theme';

interface OtherMessageProps {
    message: {
        text: string;
        timestamp: string;
        receiverImage: string;
    };
    formatTime: (timestamp: string) => string;
    onProfilePress: () => void;
}

const OtherMessage: React.FC<OtherMessageProps> = ({
    message,
    formatTime,
    onProfilePress
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

export default OtherMessage; 