import React from 'react';
import { Socket } from 'socket.io-client';

// Initially provide null (or socket if available immediately)
export const ChatContext = React.createContext<Socket | null>(null);
