import messaging from '@react-native-firebase/messaging';
import notifee, { EventType, AndroidStyle, AndroidImportance, AndroidCategory } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class NotificationService {
  constructor() {
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      await this.requestPermissions();
      this.setupMessageHandlers();
      this.setupBackgroundEventHandlers();
      this.initialized = true;
      console.log('NotificationService initialized successfully');
    } catch (error) {
      console.error('Failed to initialize NotificationService:', error);
    }
  }

  async requestPermissions() {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permissions granted');
    } else {
      console.log('Notification permissions denied');
    }
  }

  setupMessageHandlers() {
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);
      await this.displayNotification(remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background message received:', remoteMessage);
      await this.displayNotification(remoteMessage);
    });

    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('App opened from quit state via notification:', remoteMessage);
        this.handleNotificationOpenedApp(remoteMessage);
      }
    });
  }

  // Enhanced image URL validation
  isValidImageUrl(url) {
    // Return false for null, undefined, empty string, or non-string values
    if (!url || typeof url !== 'string' || url.trim().length === 0) {
      return false;
    }
    
    // Clean the URL
    const cleanUrl = url.trim();
    
    try {
      // Try to create a URL object - this validates the URL format
      const urlObj = new URL(cleanUrl);
      
      // Only allow http and https protocols for security
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        console.log('Invalid protocol for image URL:', urlObj.protocol);
        return false;
      }
      
      // Additional validation: check if it looks like an image URL
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
      const hasImageExtension = imageExtensions.some(ext => 
        cleanUrl.toLowerCase().includes(ext)
      );
      
      // Allow URLs that either have image extensions or are from trusted domains
      const trustedDomains = [
        'cdn.myusta.com',
        'firebasestorage.googleapis.com',
        'cloudinary.com',
        'amazonaws.com',
        'randomuser.me' // For testing
      ];
      
      const isTrustedDomain = trustedDomains.some(domain => 
        urlObj.hostname.includes(domain)
      );
      
      // Return true if it has image extension OR is from trusted domain
      const isValid = hasImageExtension || isTrustedDomain;
      
      if (!isValid) {
        console.log('URL validation failed - not an image URL or trusted domain:', cleanUrl);
      }
      
      return isValid;
      
    } catch (error) {
      // If URL constructor fails, check for mobile-specific protocols
      const mobileProtocols = [
        'file://',
        'content://',
        'android.resource://',
        'assets-library://' // iOS
      ];
      
      const hasMobileProtocol = mobileProtocols.some(protocol => 
        cleanUrl.startsWith(protocol)
      );
      
      if (hasMobileProtocol) {
        console.log('Valid mobile protocol URL:', cleanUrl);
        return true;
      }
      
      console.log('Invalid URL format:', cleanUrl, error.message);
      return false;
    }
  }

  extractNotificationData(message) {
    if (message.notification) {
      return {
        title: message.notification.title || 'New Notification',
        body: message.notification.body || '',
        data: message.data || {},
      };
    }
    
    return {
      title: message.data?.title || 'New Notification',
      body: message.data?.body || message.data?.message || '',
      data: message.data || {},
    };
  }

  getAndroidCategory(type) {
    switch (type) {
      case 'message': return AndroidCategory.MESSAGE;
      case 'job_application':
      case 'job_proposal': return AndroidCategory.SOCIAL;
      case 'reminder': return AndroidCategory.REMINDER;
      case 'contract': return AndroidCategory.EVENT;
      default: return AndroidCategory.STATUS;
    }
  }

  getNotificationStyle(message, type, validSenderImage, validLargeImage) {
    const data = message.data || {};
    
    if (validLargeImage) {
      return {
        type: AndroidStyle.BIGPICTURE,
        picture: validLargeImage,
        largeIcon: validSenderImage || undefined, // Use undefined instead of null
      };
    }
    
    if (data.body && data.body.length > 100) {
      return {
        type: AndroidStyle.BIGTEXT,
        text: data.body,
      };
    }
    
    if (type === 'message') {
      const messagingStyle = {
        type: AndroidStyle.MESSAGING,
        person: { name: data.senderName || 'User' },
        messages: [{
          text: data.body || data.message || '',
          timestamp: data.timestamp || Date.now(),
        }],
      };
      
      // Only add icon if it's valid
      if (validSenderImage) {
        messagingStyle.person.icon = validSenderImage;
      }
      
      return messagingStyle;
    }
    
    return null;
  }

  getNotificationActions(type) {
    switch (type) {
      case 'job_application':
        return [
          { title: 'View Application', pressAction: { id: 'view_application' } },
          { title: 'Dismiss', pressAction: { id: 'dismiss' } },
        ];
      case 'message':
        return [
          { title: 'Reply', pressAction: { id: 'reply' }, input: { placeholder: 'Type your reply...' } },
          { title: 'Mark as Read', pressAction: { id: 'mark_read' } },
        ];
      case 'contract':
        return [{ title: 'Review', pressAction: { id: 'review_contract' } }];
      case 'reminder':
        return [{ title: 'Snooze', pressAction: { id: 'snooze' } }];
      default:
        return [];
    }
  }

  async displayNotification(message) {
    if (!message) return;

    try {
      const channelId = await notifee.createChannel({
        id: 'default_channel',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'default',
        vibration: true,
        lights: true,
      });

      const { title, body, data } = this.extractNotificationData(message);
      const notificationType = data?.type || 'default';
      
      // Enhanced validation with detailed logging
      console.log('Validating notification images:', {
        senderImage: data?.senderImage,
        imageUrl: data?.imageUrl,
        type: notificationType
      });
      
      const senderImageUrl = this.isValidImageUrl(data?.senderImage) ? data.senderImage : null;
      const largeImageUrl = this.isValidImageUrl(data?.imageUrl) ? data.imageUrl : null;
      
      console.log('Image validation results:', {
        validSenderImage: !!senderImageUrl,
        validLargeImage: !!largeImageUrl,
        senderImageUrl,
        largeImageUrl
      });
      
      // Build notification config step by step
      const notificationConfig = {
        id: message.messageId || Date.now().toString(),
        title,
        body,
        data: data || {},
        android: {
          channelId,
          smallIcon: 'ic_notification',
          color: '#00203F',
          category: this.getAndroidCategory(notificationType),
          importance: AndroidImportance.HIGH,
          pressAction: { id: 'default', launchActivity: 'default' },
          style: this.getNotificationStyle(message, notificationType, senderImageUrl, largeImageUrl),
          actions: this.getNotificationActions(notificationType),
        },
        ios: {
          foregroundPresentationOptions: { alert: true, badge: true, sound: true },
          categoryId: notificationType,
          attachments: largeImageUrl ? [{ url: largeImageUrl, thumbnailHidden: false }] : undefined,
        },
      };
      
      // Only add largeIcon if we have a valid image
      if (senderImageUrl) {
        notificationConfig.android.largeIcon = senderImageUrl;
      }
      
      console.log('Final notification config:', {
        hasLargeIcon: !!notificationConfig.android.largeIcon,
        largeIcon: notificationConfig.android.largeIcon,
        hasStyle: !!notificationConfig.android.style
      });
      
      await notifee.displayNotification(notificationConfig);
      
    } catch (error) {
      console.error('Error displaying notification:', error);
      await this.displayFallbackNotification(message);
    }
  }

  async displayFallbackNotification(message) {
    try {
      const { title, body, data } = this.extractNotificationData(message);
      const channelId = await notifee.createChannel({
        id: 'fallback_channel',
        name: 'Fallback Channel',
        importance: AndroidImportance.HIGH,
      });
      
      // Minimal notification without any images
      await notifee.displayNotification({
        id: message.messageId || Date.now().toString(),
        title,
        body,
        data: data || {},
        android: {
          channelId,
          smallIcon: 'ic_notification',
          color: '#00203F',
          importance: AndroidImportance.HIGH,
          pressAction: { id: 'default', launchActivity: 'default' },
          // No largeIcon, no style - just basic notification
        },
      });
      
      console.log('Fallback notification displayed successfully');
    } catch (error) {
      console.error('Failed to display fallback notification:', error);
    }
  }

  async handleNotificationOpenedApp(notification) {
    try {
      await AsyncStorage.setItem('pendingNotification', JSON.stringify(notification));
    } catch (error) {
      console.error('Error storing pending notification:', error);
    }
  }

  setupBackgroundEventHandlers() {
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;
      
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', notification?.id);
          break;
          
        case EventType.PRESS:
          console.log('User pressed notification', notification?.id);
          await this.handleNotificationOpenedApp(notification);
          break;
          
        case EventType.ACTION_PRESS:
          console.log('User pressed action', pressAction?.id);
          await this.handleNotificationAction(pressAction, detail, notification);
          break;
      }
    });
  }

  async handleNotificationAction(pressAction, detail, notification) {
    switch (pressAction?.id) {
      case 'mark_read':
        // Handle mark as read
        break;
        
      case 'reply':
        if (detail.input) {
          await AsyncStorage.setItem('pendingReply', JSON.stringify({
            text: detail.input,
            notification: notification
          }));
        }
        break;
        
      case 'snooze':
        if (notification) {
          try {
            const date = new Date();
            date.setMinutes(date.getMinutes() + 15);
            
            await notifee.scheduleNotification({
              ...notification,
              id: `snoozed-${notification.id}`,
              schedule: { date },
            });
            
            await notifee.cancelNotification(notification.id);
          } catch (error) {
            console.error('Error snoozing notification:', error);
          }
        }
        break;
    }
  }

  async getFCMToken() {
    try {
      const token = await messaging().getToken();
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  async clearAllNotifications() {
    try {
      await notifee.cancelAllNotifications();
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  }
}

export default new NotificationService();