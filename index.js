/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType, AndroidStyle, AndroidImportance, AndroidCategory } from '@notifee/react-native';

// Handle background messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  await displayNotification(remoteMessage);
});

// Handle when app is opened from a quit state via notification
messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log('App opened from quit state via notification', remoteMessage);
      // We don't display a notification here since the app is opening
      // but we could store the notification data for processing
    }
  });

// Handle foreground messages
messaging().onMessage(async remoteMessage => {
  console.log('Foreground message received:', remoteMessage);
  await displayNotification(remoteMessage);
});

// Main function to display notifications with improved formatting
const displayNotification = async (message) => {
  if (!message) return;

  try {
    // Create a default channel - do this only once in your app
    const channelId = await notifee.createChannel({
      id: 'default_channel',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
      lights: true,
    });

    // Extract notification data from the message
    const { title, body, data } = extractNotificationData(message);
    
    // Determine category/type for specialized handling
    const notificationType = data?.type || 'default';
    
    // Create notification with appropriate styling and actions
    await notifee.displayNotification({
      id: message.messageId || Date.now().toString(),
      title,
      body,
      data: data || {},
      android: {
        channelId,
        smallIcon: 'ic_notification', // Make sure this icon exists in your drawable folder
        largeIcon: data?.senderImage,
        color: '#00203F', // Navy color from your theme
        category: getAndroidCategory(notificationType),
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
        },
        style: getNotificationStyle(message, notificationType),
        actions: getNotificationActions(notificationType),
      },
      ios: {
        foregroundPresentationOptions: {
          alert: true,
          badge: true,
          sound: true,
        },
        categoryId: notificationType,
        attachments: getIOSAttachments(message),
      },
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
};

// Extract relevant notification data based on structure
const extractNotificationData = (message) => {
  // First try to get from notification object
  if (message.notification) {
    return {
      title: message.notification.title || 'New Notification',
      body: message.notification.body || '',
      data: message.data || {},
    };
  }
  
  // Otherwise extract from data payload
  return {
    title: message.data?.title || 'New Notification',
    body: message.data?.body || message.data?.message || '',
    data: message.data || {},
  };
};

// Get Android notification category based on type
const getAndroidCategory = (type) => {
  switch (type) {
    case 'message':
      return AndroidCategory.MESSAGE;
    case 'job_application':
    case 'job_proposal':
      return AndroidCategory.SOCIAL;
    case 'reminder':
      return AndroidCategory.REMINDER;
    case 'contract':
      return AndroidCategory.EVENT;
    default:
      return AndroidCategory.STATUS;
  }
};

// Define special styling for different notification types
const getNotificationStyle = (message, type) => {
  const data = message.data || {};
  
  // Use big text style for long messages
  if (data.body && data.body.length > 100) {
    return {
      type: AndroidStyle.BIGTEXT,
      text: data.body,
    };
  }
  
  // Use big picture style if image is provided
  if (data.imageUrl) {
    return {
      type: AndroidStyle.BIGPICTURE,
      picture: data.imageUrl,
      largeIcon: data.senderImage,
    };
  }
  
  // Default to messaging style for chat messages
  if (type === 'message') {
    return {
      type: AndroidStyle.MESSAGING,
      person: {
        name: data.senderName || 'User',
        icon: data.senderImage,
      },
      messages: [
        {
          text: data.body || data.message || '',
          timestamp: data.timestamp || Date.now(),
        },
      ],
    };
  }
  
  return null; // Use default style
};

// Define action buttons based on notification type
const getNotificationActions = (type) => {
  switch (type) {
    case 'job_application':
      return [
        {
          title: 'View Application',
          pressAction: { id: 'view_application' },
        },
        {
          title: 'Dismiss',
          pressAction: { id: 'dismiss' },
        },
      ];
    case 'message':
      return [
        {
          title: 'Reply',
          pressAction: { id: 'reply' },
          input: {
            placeholder: 'Type your reply...',
          },
        },
        {
          title: 'Mark as Read',
          pressAction: { id: 'mark_read' },
        },
      ];
    case 'contract':
      return [
        {
          title: 'Review',
          pressAction: { id: 'review_contract' },
        },
      ];
    case 'reminder':
      return [
        {
          title: 'Snooze',
          pressAction: { id: 'snooze' },
        },
      ];
    default:
      return [];
  }
};

// Define iOS attachments for rich notifications
const getIOSAttachments = (message) => {
  const attachments = [];
  
  if (message.data?.imageUrl) {
    attachments.push({
      url: message.data.imageUrl,
      thumbnailHidden: false,
    });
  }
  
  return attachments.length > 0 ? attachments : undefined;
};

// Handle notification background events
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', notification?.id);
      break;
      
    case EventType.PRESS:
      console.log('User pressed notification', notification?.id);
      // The app will handle navigation when it opens
      break;
      
    case EventType.ACTION_PRESS:
      console.log('User pressed action', pressAction?.id);
      
      // Handle different actions
      switch (pressAction?.id) {
        case 'mark_read':
          // Mark as read functionality would happen on app open
          break;
          
        case 'reply':
          // Store the reply text for processing when app opens
          if (detail.input) {
            // Store the reply in AsyncStorage or similar
            console.log('User reply text:', detail.input);
          }
          break;
          
        case 'snooze':
          // Reschedule the notification for later
          if (notification) {
            const date = new Date();
            date.setMinutes(date.getMinutes() + 15); // Snooze for 15 mins
            
            await notifee.scheduleNotification({
              ...notification,
              id: `snoozed-${notification.id}`,
              schedule: {
                date,
              },
            });
            
            // Cancel the original notification
            await notifee.cancelNotification(notification.id);
          }
          break;
      }
      break;
      
    default:
      break;
  }
});

AppRegistry.registerComponent(appName, () => App);