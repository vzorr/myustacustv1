import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../../../../config/themes/theme';
import { SVGIcons } from '../../../../../config/constants/svg';

interface SelfFileAttachProps {
    message: {
        timestamp: string;
        senderImage: string;
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

const SelfFileAttach: React.FC<SelfFileAttachProps> = ({
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
    fileAttachmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    fileInfoContainer: {
        flex: 1,
        marginLeft: 8,
    },
    fileName: {
        color: COLORS.white,
        fontFamily: FONTS.interRegular,
        fontSize: fontSize[14],
        fontWeight: '500',
    },
    fileSize: {
        color: 'rgba(255,255,255,0.7)',
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

export default SelfFileAttach; 