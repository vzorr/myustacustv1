import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../../../../config/themes/theme';
import { SVGIcons } from '../../../../../config/constants/svg';

interface AudioSelfMessageProps {
    message: {
        timestamp: string;
        senderImage: string;
        attachments: Array<{
            type: 'audio';
            uri: string;
            duration?: string | null;
        }>
    };
    formatTime: (timestamp: string) => string;
    onProfilePress: () => void;
    onAudioPress: (uri: string) => void;
}

const AudioSelfMessage: React.FC<AudioSelfMessageProps> = ({
    message,
    formatTime,
    onProfilePress,
    onAudioPress
}) => {
    const audioAttachment = message.attachments.find(a => a.type === 'audio');

    if (!audioAttachment) {
        return null;
    }

    return (
        <View style={styles.messageRow}>
            <View style={styles.messageContainer}>
                <View style={styles.audioContainer}>
                    <TouchableOpacity 
                        style={styles.audioPlayButton}
                        onPress={() => onAudioPress(audioAttachment.uri)}
                    >
                        <SVGIcons.chatVoice width={24} height={24} />
                    </TouchableOpacity>
                    <View style={styles.audioWaveform}>
                        {/* Waveform UI or placeholder */}
                        <View style={styles.waveformPlaceholder} />
                    </View>
                    <Text style={styles.audioDuration}>
                        {audioAttachment.duration || '00:00'}
                    </Text>
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
    audioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
    },
    audioPlayButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    audioWaveform: {
        flex: 1,
        height: 24,
        marginHorizontal: 8,
        justifyContent: 'center',
    },
    waveformPlaceholder: {
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 1.5,
    },
    audioDuration: {
        fontSize: fontSize[12],
        color: 'rgba(255,255,255,0.8)',
        marginLeft: 4,
    },
    messageTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 8,
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

export default AudioSelfMessage; 