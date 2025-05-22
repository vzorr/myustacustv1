import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import { JOBS_STATUS_TABS, NOTIFICATION_TABS } from '../../../config/constants/constants';
import { notiiStyles } from './NotiiStyles';
import ReUseableHeader from '../../../components/AppHeader/ReUseableHeader';
import NotificationUi from './NotificationUi';

import { notificationClient } from '../../../apiManager/Client';


const NotiiData = [
    {
        id: 1,
        time: "2025-04-17T14:30:00Z",
        notification: "Mobile App Developer Needed for E-commerce App",
        image: ""
    },
    {
        id: 2,
        time: "2025-04-15T09:15:00Z",
        notification: "React Native Expert for UI Enhancements",
        image: ""
    },
    {
        id: 3,
        time: "2025-04-10T11:00:00Z",
        notification: "Fix Bugs in Existing App",
        image: ""
    },
    {
        id: 4,
        time: "2025-04-12T13:00:00Z",
        notification: "Create Admin Panel with Firebase Integration",
        image: ""
    },
    {
        id: 5,
        time: "2025-04-05T16:20:00Z",
        notification: "Redesign App Screens for Better UX",
        image: ""
    }
];


const NotificationContainer: React.FC<UserNavigationRootProps<"Notifications">> = (props) => {
    const [activeTab, setActiveTab] = useState<string>(NOTIFICATION_TABS.ACTIVITY);
    const [isLoading, setIsloading] = useState(true);
    const [notifications, setNotifications] = useState<typeof NotiiData>([]);

    useEffect(() => {
        const fetchMockData = async () => {
            setIsloading(true);
            setTimeout(() => {
                setNotifications(NotiiData);
                setIsloading(false);
            }, 1500);
        };

        fetchMockData();
    }, []);

    return (
        <View style={notiiStyles.container}>
            <ReUseableHeader />
            <NotificationUi
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                navigation={props.navigation}
                setIsloading={setIsloading}
                isLoading={isLoading}
                NotiiData={notifications}
            />
        </View>
    );
};


// Inside your component
const fetchNotifications = async () => {
    setIsloading(true);
    try {
        const userToken = token ? token : userData?.token;
        if (userToken) {
            const response = await notificationClient(userToken).get('notifications');
            
            if (response.data?.code === 200) {
                // Transform API response to our notification model
                const formattedNotifications = response.data.result.map((item: any) => ({
                    id: item.id,
                    type: mapNotificationType(item.type),
                    title: item.title,
                    message: item.message,
                    timestamp: item.createdAt,
                    read: item.read,
                    actionable: Boolean(item.linkTo),
                    jobId: item.jobId,
                    senderId: item.senderId,
                    senderName: item.senderName,
                    jobTitle: item.jobTitle
                }));
                
                setNotifications(formattedNotifications);
            }
        }
    } catch (error) {
        console.error('Error fetching notifications:', error);
    } finally {
        setIsloading(false);
    }
};

// Helper function to map API notification types to our enum
const mapNotificationType = (type: string): NotificationType => {
    switch (type) {
        case 'application': return NotificationType.JOB_APPLICATION;
        case 'message': return NotificationType.MESSAGE;
        case 'contract': return NotificationType.CONTRACT;
        case 'reminder': return NotificationType.REMINDER;
        default: return NotificationType.SYSTEM;
    }
};

export default NotificationContainer;

const styles = StyleSheet.create({});
