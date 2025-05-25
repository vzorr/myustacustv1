// ===== 3. Create: src/hooks/useNotificationHandler.js =====

import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { EventType } from '@notifee/react-native';

export const useNotificationHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Handle foreground notification events
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification?.id);
          break;
        case EventType.PRESS:
          handleNotificationPress(detail.notification);
          break;
        case EventType.ACTION_PRESS:
          handleNotificationAction(detail.pressAction, detail.notification);
          break;
      }
    });

    // Check for pending notification on app start
    checkPendingNotification();

    return unsubscribe;
  }, []);

  const handleNotificationPress = (notification) => {
    const data = notification?.data;
    
    switch (data?.type) {
      case 'message':
        navigation.navigate('ChatInbox', {
          chatData: {
            userId: data.senderId,
            jobId: data.jobId,
            jobTitle: data.jobTitle,
            userName: data.senderName,
          }
        });
        break;
      case 'job_application':
        navigation.navigate('ApplicationsList', { jobId: data.jobId });
        break;
      default:
        navigation.navigate('Notifications');
    }
  };

  const handleNotificationAction = (pressAction, notification) => {
    switch (pressAction.id) {
      case 'view_application':
        navigation.navigate('ApplicationsList', { jobId: notification.data?.jobId });
        break;
      case 'reply':
        navigation.navigate('ChatInbox', {
          chatData: {
            userId: notification.data?.senderId,
            jobId: notification.data?.jobId,
          }
        });
        break;
    }
  };

  const checkPendingNotification = async () => {
    try {
      const pendingNotification = await AsyncStorage.getItem('pendingNotification');
      if (pendingNotification) {
        const notification = JSON.parse(pendingNotification);
        handleNotificationPress(notification);
        await AsyncStorage.removeItem('pendingNotification');
      }
    } catch (error) {
      console.error('Error checking pending notification:', error);
    }
  };
};