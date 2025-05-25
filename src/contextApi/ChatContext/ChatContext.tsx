import React, { createContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { SERVER_URL, SOCKET_EVENTS, createSocketConnection } from '../../utils/socketUtils';

// Create the context
export const ChatContext = createContext<Socket | null>(null);

// Create the provider component
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { userData }: any = useSelector((state: any) => state?.userInfo);
    
    useEffect(() => {
        // Only create socket connection if we have a user ID
        if (userData?.userId) {
            console.log("Initializing socket connection with user ID:", userData.userId);
            
            // Initialize socket with the server URL and options
            const socketInstance = createSocketConnection(userData.userId);
            
            // Handle connect event
            socketInstance.on(SOCKET_EVENTS.CONNECT, () => {
                console.log("✅ Connected to Socket.IO server");
            });
            
            // Handle connection error
            socketInstance.on(SOCKET_EVENTS.CONNECT_ERROR, (err) => {
                console.error("❌ Connection error:", err.message);
            });
            
            // Handle disconnect
            socketInstance.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
                console.log("⚠ Disconnected from server:", reason);
                if (reason === "io server disconnect") {
                    // reconnect if server disconnected us
                    socketInstance.connect();
                }
            });
            
            setSocket(socketInstance);
            
            // Return cleanup function
            return () => {
                console.log("Disconnecting socket");
                socketInstance.disconnect();
            };
        }
        
        return () => {
            // No cleanup needed if socket wasn't created
        };
    }, [userData?.userId]);
    
    return (
        <ChatContext.Provider value={socket}>
            {children}
        </ChatContext.Provider>
    );
}; 