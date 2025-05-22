// Create a new component for notification details
// src/screens/TabsScreens/Notifications/NotificationDetailScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import ReUseableHeader from '../../../components/AppHeader/ReUseableHeader';
import { COLORS, FONTS, fontSize } from '../../../config/themes/theme';
import CustomButton from '../../../components/Buttons/CustomButton';

const NotificationDetailScreen: React.FC<UserNavigationRootProps<"NotificationDetail">> = (props) => {
    const { notification } = props.route.params;
    const [loading, setLoading] = useState(false);
    
    const handleAction = () => {
        // Navigate to appropriate screen based on notification type
        if (notification.type === 'job_application') {
            props.navigation.navigate('ApplicationsList', { jobId: notification.jobId });
        } else if (notification.type === 'message') {
            props.navigation.navigate('ChatInbox', { 
                chatData: {
                    userId: notification.senderId,
                    jobId: notification.jobId,
                    jobTitle: notification.jobTitle,
                    userName: notification.senderName,
                    isOnline: false,
                    isBlocked: false,
                }
            });
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <ReUseableHeader headerText="Notification Details" />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.timestamp}>{notification.time}</Text>
                <Text style={styles.title}>{notification.title || notification.notification}</Text>
                <Text style={styles.description}>{notification.description || ""}</Text>
                
                {notification.actionable && (
                    <CustomButton 
                        title={notification.actionText || "View Details"} 
                        onPress={handleAction}
                        style={styles.actionButton}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    contentContainer: {
        padding: 20,
        gap: 16,
    },
    timestamp: {
        fontSize: fontSize[12],
        fontFamily: FONTS.interRegular,
        color: COLORS.GreyedOut,
    },
    title: {
        fontSize: fontSize[18],
        fontFamily: FONTS.interSemiBold,
        color: COLORS.Navy,
    },
    description: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        color: COLORS.Navy200,
        marginTop: 8,
    },
    actionButton: {
        marginTop: 20,
        width: '100%',
    }
});

export default NotificationDetailScreen;