import { io, Socket } from 'socket.io-client';
import { SCOCKET_BASE_URL } from '../apiManager/Client';

// Socket server URL - use consistent URL
export const SERVER_URL = "http://47.254.134.96:3001";

// Chat event names
export const SOCKET_EVENTS = {
    // Standard Socket.IO  on_events 
    CONNECT: 'connect',
    CONNECT_ERROR: 'connect_error',
    DISCONNECT: 'disconnect',

    // Chat message events
    SEND_MESSAGE: 'send_message',
    RECEIVE_MESSAGE: 'receive_message',
    
    // Room events
    JOIN_CHAT_ROOM: 'join_chat_room',
    LEAVE_CHAT_ROOM: 'leave_chat_room',
    
    // Chat history events
    GET_CHAT_HISTORY: 'get_chat_history',
    CHAT_HISTORY_RECEIVED: 'chat_history_received',
    
    // Chat list events
    GET_CHAT_LIST: 'get_chat_list',
    CHAT_LIST_RECEIVED: 'chat_list_received',
};

// Message structure
export interface ChatMessage {
    messageId: string;
    clientTempId?: string;
    jobId: string | number;
    jobTitle: string;
    userName: string;
    phone?: string;
    userId: string | number;
    receiverId: string | number;
    isOnline: boolean;
    isBlocked: boolean;
    ChatDate: string;
    messageType: 'text' | 'image' | 'audio' | 'file';
    messageImages: string[];
    audioFile: string;
    textMsg: string;
    replyToMessageId: string | null;
    editedAt: string | null;
    deleted: boolean;
    isSystemMessage: boolean;
    attachments: any[];
    status?: 'sending' | 'sent' | 'delivered' | 'read';
    createdAt?: string;
}

// Chat list item structure
export interface ChatListItem {
    profilePicture: string | null;
    jobId: number | string;
    jobTitle: string;
    userName: string;
    userId: number | string;
    isOnline: boolean;
    isBlocked: boolean;
    lastChatMessage: string;
    lastChatDate: string;
    newMessageCount: number;
}

// Create a socket connection
export const createSocketConnection = (userId: string | number): Socket => {
    return io(SERVER_URL, {
        transports: ["websocket"],
        query: {
            userId: userId
        }
    });
}; 