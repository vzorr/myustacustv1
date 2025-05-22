import React, { useContext, useState, useEffect, useCallback } from 'react'
import { Platform, Alert } from 'react-native'
import { UserNavigationRootProps } from '../../../../types/stacksParams'
import ChatInboxUi from './ChatInboxUi'
import { useSelector } from 'react-redux'
import io from "socket.io-client";
import { BASE_SOCKET_URL } from '../../../../apiManager/Client'
import { ChatService } from '../../../../apiManager/Client'
import LoadingScreen from '../../../../components/Loader/LoadingScreen'
import Toast from 'react-native-simple-toast'
import moment from 'moment'
import { v4 as uuidv4 } from "uuid";

const ChatInboxContainer: React.FC<UserNavigationRootProps<"ChatInbox">> = (props) => {
    // Get chat data from route params
    const chatData = props?.route?.params?.chatData;
    const prefilledMessage = props?.route?.params?.prefilledMessage;
    
    // State management
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(true)
    const [socket, setSocket] = useState<any>(null)
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [isSending, setIsSending] = useState<boolean>(false)
    
    // User information from Redux store
    const { userData } = useSelector((state: any) => state?.userInfo)
    const { userProfile }: any = useSelector((state: any) => state?.userProfile)
    const { token }: any = useSelector((state: any) => state?.accessToken)
    
    // Extract chat data parameters
    const { otherUserId, jobId, jobTitle, userName, isOnline, isBlocked } = chatData;
    
    // Initialize socket connection
    useEffect(() => {
        if (userData?.userId) {
            const socketInstance = io(BASE_SOCKET_URL, {
                transports: ['websocket'],
                query: { userId: userData.userId }
            });
            
            socketInstance.on("connect", () => {
                console.log("✅ Connected to Socket.IO server", socketInstance.id);
                setIsConnected(true);
                
                // Join the chat room
                socketInstance.emit("join_chat_room", {
                    jobId,
                    userId: userData.userId,
                    receiverId: otherUserId
                });
                
                // Request chat history
                loadMessages(1, true);
            });
            
            socketInstance.on("disconnect", () => {
                console.log("❌ Disconnected from Socket.IO server");
                setIsConnected(false);
            });
            
            socketInstance.on("receive_message", (message) => {
                console.log("📥 Message received:", message);
                if (message.senderId !== userData.userId) {
                    // Add the new message to state if it's from the other user
                    setMessages(prev => [message, ...prev]);
                }
            });
            
            socketInstance.on("message_sent", (confirmation) => {
                console.log("✅ Message sent confirmation:", confirmation);
                
                // Update the temporary message with the confirmed one
                setMessages(prev => prev.map(msg => 
                    msg.clientTempId === confirmation.clientTempId 
                        ? { ...confirmation, status: 'delivered' } 
                        : msg
                ));
            });
            
            socketInstance.on("error", (error) => {
                console.error("❌ Socket error:", error);
                Toast.show("Connection error: " + error.message, Toast.LONG);
            });
            
            setSocket(socketInstance);
            
            // Cleanup on unmount
            return () => {
                if (socketInstance) {
                    socketInstance.emit("leave_chat_room", {
                        jobId,
                        userId: userData.userId,
                        receiverId: otherUserId
                    });
                    socketInstance.disconnect();
                }
            };
        }
    }, [userData?.userId]);
    
    // Load messages function
    const loadMessages = useCallback(async (pageNumber = 1, isInitial = false) => {
        if (isInitial) setLoading(true);
        else if (pageNumber > 1) setIsLoadingMore(true);
        else setRefreshing(true);
        
        try {
            const userToken = token || userData?.token;
            if (!userToken) {
                throw new Error("Authentication token is required");
            }
            
            const response = await ChatService.getClient(userToken).get(
                `chats/history`, {
                    params: {
                        jobId,
                        receiverId: otherUserId,
                        page: pageNumber,
                        limit: 20
                    }
                }
            );
            
            if (response.data?.code !== 200) {
                throw new Error(response.data?.message || "Failed to load messages");
            }
            
            const newMessages = response.data.result.data || [];
            setHasMoreMessages(response.data.result.hasNextPage);
            
            // Update state based on page number
            if (pageNumber === 1) {
                setMessages(newMessages);
            } else {
                setMessages(prev => [...prev, ...newMessages]);
            }
            
            setPage(pageNumber);
        } catch (error) {
            console.error("Error loading messages:", error);
            Toast.show("Failed to load messages", Toast.SHORT);
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
            setRefreshing(false);
        }
    }, [jobId, otherUserId, token, userData]);
    
    // Load more messages when user scrolls to the top
    const handleLoadMore = () => {
        if (!isLoadingMore && hasMoreMessages) {
            loadMessages(page + 1);
        }
    };
    
    // Pull to refresh
    const handleRefresh = () => {
        if (!refreshing) {
            loadMessages(1);
        }
    };
    
    // Handle sending message
    const handleSendMessage = async (values: any) => {
        if (isSending) return;
        
        // Early validation
        if (!values.textMsg && !values.imageFile && !values.audioFile) {
            Toast.show("Can't send an empty message", Toast.SHORT);
            return;
        }
        
        if (!socket || !isConnected) {
            Toast.show("Not connected to chat server", Toast.SHORT);
            return;
        }
        
        setIsSending(true);
        
        try {
            // Create a temporary message ID
            const tempId = `temp-${Date.now()}`;
            
            // Create the message payload
            const messagePayload: any = {
                clientTempId: tempId,
                receiverId: otherUserId,
                jobId,
                jobTitle,
                userId: userData.userId,
                userName: `${userProfile?.firstName || userData?.firstName} ${userProfile?.lastName || userData?.lastName}`,
                timestamp: new Date().toISOString(),
                status: 'sending',
                type: ''
            };
            
            // Handle text messages
            if (values.textMsg) {
                messagePayload.textMsg = values.textMsg;
                messagePayload.type = 'text';
            }
            
            // TODO: Handle image messages
            if (values.imageFile) {
                // Image handling logic
                // This would typically involve uploading the image first,
                // then sending the URL in the message
            }
            
            // TODO: Handle audio messages
            if (values.audioFile) {
                // Audio handling logic
            }
            
            // Add the temporary message to the state
            const tempMessage = {
                ...messagePayload,
                senderId: userData.userId,
                status: 'sending',
                isTemporary: true
            };
            
            setMessages(prev => [tempMessage, ...prev]);
            
            // Send the message through socket
            socket.emit("send_message", messagePayload, (response: any, error: any) => {
                if (error) {
                    console.error("Error sending message:", error);
                    Toast.show("Failed to send message", Toast.SHORT);
                    
                    // Mark the message as failed
                    setMessages(prev => prev.map(msg => 
                        msg.clientTempId === tempId 
                            ? { ...msg, status: 'failed' } 
                            : msg
                    ));
                } else {
                    console.log("Message sent successfully:", response);
                }
            });
        } catch (error) {
            console.error("Error in handleSendMessage:", error);
            Toast.show("An error occurred while sending the message", Toast.SHORT);
        } finally {
            setIsSending(false);
        }
    };
    
    // Try to resend a failed message
    const handleResendMessage = (message: any) => {
        if (!socket || !isConnected) {
            Toast.show("Not connected to chat server", Toast.SHORT);
            return;
        }
        
        // Remove the failed message and send it again
        setMessages(prev => prev.filter(msg => msg.clientTempId !== message.clientTempId));
        
        // Create a new values object for the message
        const values = {
            textMsg: message.textMsg || '',
            imageFile: message.imageFile || null,
            audioFile: message.audioFile || null
        };
        
        handleSendMessage(values);
    };
    
    // If still loading, show loading screen
    if (loading) {
        return <LoadingScreen />;
    }
    
    return (
        <ChatInboxUi
            userId={otherUserId}
            jobId={jobId}
            jobTitle={jobTitle}
            userName={userName}
            isOnline={isOnline}
            isBlocked={isBlocked}
            navigation={props.navigation}
            messages={messages}
            loggedInUserId={userData?.userId}
            userProfile={userProfile}
            onSendMessage={handleSendMessage}
            onLoadMore={handleLoadMore}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            isLoadingMore={isLoadingMore}
            onResendMessage={handleResendMessage}
            isConnected={isConnected}
            prefilledMessage={prefilledMessage}
        />
    )
}

export default ChatInboxContainer