import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../../../../config/themes/theme';
import { SVGIcons } from '../../../../../config/constants/svg';

interface OtherFileAttachProps {
    message: {
        timestamp: string;
        receiverImage: string;
        attachments: Array<{
            type: 'file';
            uri: string;
            name?: string | null;
            size?: number | null;
        }>
    };
    formatTime: (timestamp: string) => string;
    onProfilePress: () => void;
    onFilePress: (uri: string, name?: string | null) => void;
}

const OtherFileAttach: React.FC<OtherFileAttachProps> = ({
    message,
    formatTime,
    onProfilePress,
    onFilePress
}) => {
    const fileAttachments = message.attachments.filter(a => a.type === 'file');

    if (fileAttachments.length === 0) {
        return null;
    }

    return (
        <View style={styles.messageRow}>
            <TouchableOpacity style={styles.userImageContainer} onPress={onProfilePress}>
                <Image
                    source={{ uri: message.receiverImage }}
                    style={styles.userImage}
                />
            </TouchableOpacity>
            <View style={styles.messageContainer}>
                {fileAttachments.map((file, index) => (
                    <TouchableOpacity
                        key={`file-${index}`}
                        style={styles.fileAttachmentContainer}
                        onPress={() => onFilePress(file.uri, file.name)}
                    >
                        <SVGIcons.fileAttach width={24} height={24} />
                        <View style={styles.fileInfoContainer}>
                            <Text style={styles.fileName} numberOfLines={1}>
                                {file.name || 'File'}
                            </Text>
                            {file.size && (
                                <Text style={styles.fileSize}>
                                    {(file.size / 1024).toFixed(1)} KB
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
                
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
    fileAttachmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    fileInfoContainer: {
        flex: 1,
        marginLeft: 8,
    },
    fileName: {
        color: COLORS.Navy,
        fontFamily: FONTS.interRegular,
        fontSize: fontSize[14],
        fontWeight: '500',
    },
    fileSize: {
        color: COLORS.GreyedOut,
        fontSize: fontSize[12],
        marginTop: 2,
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

export default OtherFileAttach; 