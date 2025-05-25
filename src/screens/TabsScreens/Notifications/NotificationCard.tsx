import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import { notiiStyles } from './NotiiStyles';
import { SVGIcons } from '../../../config/constants/svg';
import { COLORS, FONTS, fontSize } from '../../../config/themes/theme';

interface NotificationCardProps {
    id: string;
    type: string;
    title?: string;
    message: string;
    timestamp: string;
    read: boolean;
    image?: string;
    jobId?: string;
    senderId?: string;
    onPress: () => void;
    onMarkAsRead?: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
    id,
    type,
    title,
    message,
    timestamp,
    read,
    image,
    onPress,
    onMarkAsRead,
}) => {
    const getShortTimeAgo = (dateString: string) => {
        const now = moment();
        const past = moment(dateString);

        if (!past.isValid()) return '';

        const diffInSeconds = now.diff(past, 'seconds');
        if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;

        const diffInMinutes = now.diff(past, 'minutes');
        if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

        const diffInHours = now.diff(past, 'hours');
        if (diffInHours < 24) return `${diffInHours} hr ago`;

        const diffInDays = now.diff(past, 'days');
        if (diffInDays === 1) return `1 day ago`;
        else if (diffInDays < 7) return `${diffInDays} days ago`;
        else if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        else return past.format('MMM DD, YYYY');
    };

    const formattedDate = getShortTimeAgo(timestamp);
    
    // Get appropriate icon for notification type
    const getNotificationIcon = () => {
        switch (type) {
            case 'job_application':
                return <SVGIcons.breifCase width={24} height={24} />;
            case 'message':
                return <SVGIcons.MessageIcon width={24} height={24} />;
            case 'contract':
                return <SVGIcons.whiteLock width={24} height={24} />;
            case 'reminder':
                return <SVGIcons.calenderIcon width={24} height={24} />;
            default:
                return <SVGIcons.bellIcon width={24} height={24} />;
        }
    };

    return (
        <TouchableOpacity
            style={[
                notiiStyles.chatListCardMain,
                !read && styles.unreadNotification
            ]}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View style={[notiiStyles.imageMainView, styles.iconContainer]}>
                {image ? (
                    <Image
                        style={notiiStyles.imageView}
                        source={{ uri: image }}
                        resizeMode="cover"
                    />
                ) : (
                    getNotificationIcon()
                )}
            </View>
            
            <View style={notiiStyles.cardContentContainer}>
                {title && (
                    <Text style={styles.notificationTitle} numberOfLines={1}>
                        {title}
                    </Text>
                )}
                <Text 
                    style={[
                        notiiStyles.notiiText,
                        !read && styles.unreadText
                    ]}
                    numberOfLines={2}
                >
                    {message}
                </Text>
                <Text style={notiiStyles.dateText}>{formattedDate}</Text>
            </View>
            
            {!read && (
                <View style={styles.unreadIndicator} />
            )}
            
            {onMarkAsRead && !read && (
                <TouchableOpacity 
                    style={styles.markReadButton}
                    onPress={(e) => {
                        e.stopPropagation();
                        onMarkAsRead(id);
                    }}
                >
                    <View style={styles.markReadDot} />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.Navy100,
    },
    unreadNotification: {
        backgroundColor: 'rgba(0, 32, 63, 0.05)',
    },
    unreadText: {
        fontFamily: FONTS.interSemiBold,
        fontWeight: '600',
        color: COLORS.Navy,
    },
    notificationTitle: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interSemiBold,
        fontWeight: '600',
        color: COLORS.Navy,
        marginBottom: 2,
    },
    unreadIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.Yellow,
        position: 'absolute',
        top: 8,
        right: 8,
    },
    markReadButton: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
    },
    markReadDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: COLORS.Navy200,
    },
});

export default NotificationCard;