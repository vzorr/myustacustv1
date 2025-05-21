// Create a more robust notification model
// src/types/notificationTypes.ts

export enum NotificationType {
    JOB_APPLICATION = 'job_application',
    MESSAGE = 'message',
    CONTRACT = 'contract',
    REMINDER = 'reminder',
    SYSTEM = 'system',
}

export interface NotificationData {
    id: string;
    type: NotificationType;
    title?: string;
    message: string;
    description?: string;
    timestamp: string;
    read: boolean;
    actionable: boolean;
    actionText?: string;
    // For deep linking
    jobId?: string;
    senderId?: string;
    senderName?: string;
    jobTitle?: string;
    image?: string;
}