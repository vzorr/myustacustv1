import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export const ConversationContext = createContext<Socket | null>(null);