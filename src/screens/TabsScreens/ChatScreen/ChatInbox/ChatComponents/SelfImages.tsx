import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../../../../config/themes/theme';
import FastImage from 'react-native-fast-image';

interface SelfImagesProps {
    message: {
        timestamp: string;
        senderImage: string;
        attachments: Array<{
            type: 'image';
            uri: string;
        }>
    };
    formatTime: (timestamp: string) => string;
    onProfilePress: () => void;
    onImagePress: (uri: string) => void;
}

const SelfImages: React.FC<SelfImagesProps> = ({
    message,
    formatTime,
    onProfilePress,
    onImagePress
}) => {
    const imageAttachments = message.attachments.filter(a => a.type === 'image');

    if (imageAttachments.length === 0) {
        return null;
    }

    return (
        <View style={styles.messageRow}>
            <View style={styles.messageContainer}>
                <View style={styles.imageGridContainer}>
                    {imageAttachments.map((image, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={[
                                imageAttachments.length === 1
                                    ? styles.singleImageItem
                                    : styles.multiImageItem,
                            ]}
                            onPress={() => onImagePress(image.uri)}
                        >
                            <FastImage
                                source={{ uri: image.uri }}
                                style={styles.attachmentImage}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
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
    imageGridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 4,
        gap: 8,
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

export default SelfImages; 