// src/components/NotificationBadge/NotificationBadge.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, fontSize } from '../../config/themes/theme';
import { notificationClient } from '../../apiManager/Client';

interface NotificationBadgeProps {
    size?: number;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ size = 16 }) => {
    const [unreadCount, setUnreadCount] = useState(0);
    const { userData } = useSelector((state: any) => state?.userInfo);
    const { token } = useSelector((state: any) => state?.accessToken);

    useEffect(() => {
        fetchUnreadCount();
    }, []);

    const fetchUnreadCount = async () => {
        try {
            const userToken = token ? token : userData?.token;
            if (userToken) {
                const response = await notificationClient(userToken).get('notifications/unread/count');
                if (response.data?.code === 200) {
                    setUnreadCount(response.data.result?.count || 0);
                }
            }
        } catch (error) {
            console.error('Error fetching unread count:', error);
        }
    };

    if (unreadCount === 0) return null;

    return (
        <View style={[styles.badge, { width: size, height: size, borderRadius: size / 2 }]}>
            <Text style={styles.badgeText}>
                {unreadCount > 99 ? '99+' : unreadCount}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        backgroundColor: COLORS.Yellow,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -5,
        right: -5,
        minWidth: 16,
        minHeight: 16,
        paddingHorizontal: 2,
    },
    badgeText: {
        color: COLORS.Navy,
        fontSize: fontSize[10],
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default NotificationBadge;