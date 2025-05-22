import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// API Base URLs
export const BASE_API_URL_STAGING = 'http://151.243.213.116:3000/api/';
export const BASE_API_URL_PRODUCTION = 'http://151.243.213.116:3000/api/'; // Currently same as staging
export const GOOGLE_PLACES_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
export const BASE_SOCKET_URL = 'http://151.243.213.116:5000/api/v1/'; // Fixed typo in variable name
export const BASE_CHAT_URL = 'http://151.243.213.116:5000/api/v1/';
export const BASE_NOTIFICATION_URL = 'http://151.243.213.116:5000/api/v1/';

// Default timeout in ms (10 seconds)
const DEFAULT_TIMEOUT = 10000;

// Common request interceptor
const addRequestInterceptor = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add any common request modifications here
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

// Common response interceptor
const addResponseInterceptor = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.response.use(
    (response) => {
      // Handle successful responses
      return response;
    },
    (error: AxiosError) => {
      // Handle common error cases
      if (error.response) {
        // Server returned an error response
        const statusCode = error.response.status;
        
        // Handle specific status codes
        if (statusCode === 401) {
          // Unauthorized - handle token expiration
          console.log('Authentication error, token may be expired');
          // Could dispatch logout action or refresh token here
        } else if (statusCode === 429) {
          // Rate limited
          console.log('Rate limit exceeded, please try again later');
        }
      } else if (error.request) {
        // No response received (network error)
        console.log('Network error, no response received');
      } else {
        // Request setup error
        console.log('Error setting up request:', error.message);
      }
      
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

// Base client function
const createClient = (
  baseURL: string,
  token: string | null = null,
  headers: Record<string, string> = {},
  timeout: number = DEFAULT_TIMEOUT
): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const axiosInstance = axios.create(config);
  return addResponseInterceptor(addRequestInterceptor(axiosInstance));
};

// Main API client with authorization
export const client = (token: string | null = null): AxiosInstance => {
  return createClient(BASE_API_URL_STAGING, token);
};

// Client without authorization headers
export const client1 = (token: string | null = null): AxiosInstance => {
  return createClient(BASE_API_URL_STAGING);
};

// OTP client
export const otpClient = (token: string | null = null): AxiosInstance => {
  return createClient(BASE_API_URL_STAGING, null, {
    'x-auth-otp': token || '',
  });
};

// Client for form data
export const ClientFormData = (token: string | null = null): AxiosInstance => {
  return createClient(BASE_API_URL_STAGING, token, {
    'Content-Type': 'multipart/form-data',
  });
};

// Notification client
export const notificationClient = (token: string | null = null): AxiosInstance => {
  return createClient(BASE_NOTIFICATION_URL, token);
};

// Enhanced notification client with specialized functions
export const NotificationService = {
  getClient: (token: string | null = null): AxiosInstance => {
    return notificationClient(token);
  },
  
  // Get all notifications
  getAllNotifications: async (token: string | null, page: number = 1, limit: number = 20): Promise<AxiosResponse> => {
    return notificationClient(token).get('/notifications', {
      params: { page, limit }
    });
  },
  
  // Get notifications by type
  getNotificationsByType: async (token: string | null, type: string, page: number = 1, limit: number = 20): Promise<AxiosResponse> => {
    return notificationClient(token).get(`/notifications/type/${type}`, {
      params: { page, limit }
    });
  },
  
  // Get notification by ID
  getNotificationById: async (token: string | null, id: string): Promise<AxiosResponse> => {
    return notificationClient(token).get(`/notifications/${id}`);
  },
  
  // Mark notification as read
  markAsRead: async (token: string | null, id: string): Promise<AxiosResponse> => {
    return notificationClient(token).post(`/notifications/${id}/read`);
  },
  
  // Mark all notifications as read
  markAllAsRead: async (token: string | null): Promise<AxiosResponse> => {
    return notificationClient(token).post('/notifications/read-all');
  },
  
  // Get unread count
  getUnreadCount: async (token: string | null): Promise<AxiosResponse> => {
    return notificationClient(token).get('/notifications/unread/count');
  },
  
  // Delete notification
  deleteNotification: async (token: string | null, id: string): Promise<AxiosResponse> => {
    return notificationClient(token).delete(`/notifications/${id}`);
  },
  
  // Update FCM token
  updateFCMToken: async (token: string | null, fcmToken: string, deviceId: string): Promise<AxiosResponse> => {
    return notificationClient(token).post('/auth/register-device', { 
      token: fcmToken,
      deviceId,
      deviceType: 'mobile',
      platform: Platform.OS,
      deviceModel: DeviceInfo.getModel(),
      deviceOS: `${Platform.OS} ${DeviceInfo.getSystemVersion()}`,
      appVersion: DeviceInfo.getVersion()
    });
  },
};

// Chat service with comprehensive API methods
export const ChatService = {
  /**
   * Get the base chat client with authorization
   * @param token Authentication token
   * @returns Configured axios instance
   */
  getClient: (token: string | null = null): AxiosInstance => {
    return createClient(BASE_CHAT_URL, token);
  },
  
  /**
   * Get chat history between two users for a specific job
   * @param token Authentication token
   * @param params Query parameters including jobId, receiverId, and pagination
   * @returns Promise with chat history response
   */
  getChatHistory: async (token: string | null, params: {
    jobId: string | number;
    receiverId: string | number;
    page?: number;
    limit?: number;
  }): Promise<AxiosResponse> => {
    return createClient(BASE_CHAT_URL, token).get('/chats/history', { params });
  },
  
  /**
   * Get the list of active chats for the current user
   * @param token Authentication token
   * @param page Page number for pagination
   * @param limit Number of items per page
   * @returns Promise with chat list response
   */
  getChatList: async (token: string | null, page: number = 1, limit: number = 20): Promise<AxiosResponse> => {
    return createClient(BASE_CHAT_URL, token).get('/chats/list', {
      params: { page, limit }
    });
  },
  
  /**
   * Mark messages as read for a specific chat
   * @param token Authentication token
   * @param params Parameters including jobId and senderId
   * @returns Promise with response
   */
  markMessagesAsRead: async (token: string | null, params: {
    jobId: string | number;
    senderId: string | number;
  }): Promise<AxiosResponse> => {
    return createClient(BASE_CHAT_URL, token).post('/chats/read', params);
  },
  
  /**
   * Block a user from sending messages
   * @param token Authentication token
   * @param userId ID of the user to block
   * @returns Promise with response
   */
  blockUser: async (token: string | null, userId: string | number): Promise<AxiosResponse> => {
    return createClient(BASE_CHAT_URL, token).post(`/users/${userId}/block`);
  },
  
  /**
   * Unblock a previously blocked user
   * @param token Authentication token
   * @param userId ID of the user to unblock
   * @returns Promise with response
   */
  unblockUser: async (token: string | null, userId: string | number): Promise<AxiosResponse> => {
    return createClient(BASE_CHAT_URL, token).post(`/users/${userId}/unblock`);
  },
  
  /**
   * Delete a chat conversation
   * @param token Authentication token
   * @param params Parameters including jobId and otherUserId
   * @returns Promise with response
   */
  deleteChat: async (token: string | null, params: {
    jobId: string | number;
    otherUserId: string | number;
  }): Promise<AxiosResponse> => {
    return createClient(BASE_CHAT_URL, token).delete('/chats', { 
      data: params 
    });
  },
  
  /**
   * Upload a file attachment to the chat
   * @param token Authentication token
   * @param file File object to upload
   * @param type Type of the attachment (image, audio, or file)
   * @returns Promise with upload response
   */
  uploadAttachment: async (token: string | null, file: any, type: 'image' | 'audio' | 'file'): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type || (type === 'image' ? 'image/jpeg' : type === 'audio' ? 'audio/mp4' : 'application/octet-stream'),
      name: file.name || `${type}-${Date.now()}.${type === 'image' ? 'jpg' : type === 'audio' ? 'm4a' : 'bin'}`
    });
    formData.append('type', type);
    
    return createClient(BASE_CHAT_URL, token, {
      'Content-Type': 'multipart/form-data'
    }).post('/chats/upload', formData);
  },
  
  /**
   * Search through chat messages
   * @param token Authentication token
   * @param searchQuery Text to search for
   * @param params Optional parameters including pagination and filters
   * @returns Promise with search results response
   */
  searchMessages: async (token: string | null, searchQuery: string, params?: {
    jobId?: string | number;
    receiverId?: string | number;
    page?: number;
    limit?: number;
  }): Promise<AxiosResponse> => {
    return createClient(BASE_CHAT_URL, token).get('/chats/search', { 
      params: { 
        query: searchQuery,
        ...params
      } 
    });
  },
  
  /**
   * Get chat statistics (message count, unread count, etc.)
   * @param token Authentication token
   * @returns Promise with chat statistics response
   */
  getChatStats: async (token: string | null): Promise<AxiosResponse> => {
    return createClient(BASE_CHAT_URL, token).get('/chats/stats');
  },
  
  /**
   * Get user's online status
   * @param token Authentication token
   * @param userId ID of the user to check
   * @returns Promise with online status response
   */
  getUserOnlineStatus: async (token: string | null, userId: string | number): Promise<AxiosResponse> => {
    return createClient(BASE_CHAT_URL, token).get(`/users/${userId}/status`);
  },
  
  /**
   * Update the user's own online status
   * @param token Authentication token
   * @param isOnline Boolean indicating whether the user is online
   * @returns Promise with response
   */
  updateOnlineStatus: async (token: string | null, isOnline: boolean): Promise<AxiosResponse> => {
    return createClient(BASE_CHAT_URL, token).post('/users/status', { isOnline });
  },
  
  /**
   * Delete a specific message
   * @param token Authentication token
   * @param messageId ID of the message to delete
   * @returns Promise with response
   */
  deleteMessage: async (token: string | null, messageId: string): Promise<AxiosResponse> => {
    return createClient(BASE_CHAT_URL, token).delete(`/chats/messages/${messageId}`);
  },
  
  /**
   * Edit a previously sent message
   * @param token Authentication token
   * @param messageId ID of the message to edit
   * @param newText New text content for the message
   * @returns Promise with response
   */
  editMessage: async (token: string | null, messageId: string, newText: string): Promise<AxiosResponse> => {
    return createClient(BASE_CHAT_URL, token).put(`/chats/messages/${messageId}`, { text: newText });
  },
  
  /**
   * Report inappropriate message or user
   * @param token Authentication token
   * @param params Report parameters
   * @returns Promise with response
   */
  reportContent: async (token: string | null, params: {
    messageId?: string;
    userId?: string | number;
    reason: string;
    details?: string;
  }): Promise<AxiosResponse> => {
    return createClient(BASE_CHAT_URL, token).post('/chats/report', params);
  },
  
  /**
   * Send typing indicator to the other user
   * @param token Authentication token
   * @param params Parameters including jobId and receiverId
   * @returns Promise with response
   */
  sendTypingIndicator: async (token: string | null, params: {
    jobId: string | number;
    receiverId: string | number;
    isTyping: boolean;
  }): Promise<AxiosResponse> => {
    return createClient(BASE_CHAT_URL, token).post('/chats/typing', params);
  }
};

// Export environment info for troubleshooting
export const API_ENV = {
  currentBaseUrl: BASE_API_URL_STAGING,
  isProduction: BASE_API_URL_STAGING === BASE_API_URL_PRODUCTION,
};