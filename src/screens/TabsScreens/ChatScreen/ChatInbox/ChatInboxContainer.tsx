import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { UserNavigationRootProps } from '../../../../types/stacksParams';
import { useChat } from '../../../../hooks/useChat';
import { AttachmentType } from '../../../../types/chat';
import ChatInboxUi from './ChatInboxUi';
import LoadingScreen from '../../../../components/Loader/LoadingScreen';
import Toast from 'react-native-simple-toast';
import { chatService } from '../../../../services/ChatService';
import { useSelector } from 'react-redux';

const ChatInboxContainer: React.FC<UserNavigationRootProps<"ChatInbox">> = (props) => {
  const { userData } = useSelector((state: any) => state?.userInfo);
  const [isServiceReady, setIsServiceReady] = useState(false);
  const chatData = props?.route?.params?.chatData;
  const { 
    otherUserId, 
    jobId, 
    jobTitle, 
    userName, 
    isOnline, 
    isBlocked,
    conversationId: existingConversationId 
  }: any = chatData;

  // Initialize chat service if needed
  useEffect(() => {
    const checkChatService = async () => {
      try {
        if (chatService.isConnected()) {
          setIsServiceReady(true);
          return;
        }

        if (!userData?.userId || !userData?.token) {
          console.error('User not authenticated');
          Toast.show('Please login to use chat', Toast.SHORT);
          props.navigation.goBack();
          return;
        }

        // Try to initialize
        const recovered = await chatService.recoverSession();
        if (!recovered) {
          await chatService.initialize(
            userData.userId,
            userData.userType || userData.role || 'customer',
            userData.token
          );
        }
        
        setIsServiceReady(true);
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        Toast.show('Failed to connect to chat', Toast.SHORT);
        props.navigation.goBack();
      }
    };

    checkChatService();
  }, [userData, props.navigation]);

  const {
    messages,
    loading,
    sending,
    connected,
    typing,
    sendMessage,
    sendAttachment,
    loadMore,
    markAsRead,
    sendTypingStatus,
    conversationId,
    error
  } = useChat({
    jobId: jobId,              // Changed from roomId to jobId
    receiverId: otherUserId,
    conversationId: existingConversationId,  // Add existing conversation ID if available
    jobTitle: jobTitle         // Optional, for context
  });

  useEffect(() => {
    if (!loading && connected && conversationId) {
      markAsRead();
    }
  }, [loading, connected, conversationId, markAsRead]);

  // Save last active conversation when leaving
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('beforeRemove', () => {
      if (conversationId) {
        chatService.saveLastActiveConversation(conversationId);
      }
    });

    return unsubscribe;
  }, [conversationId, props.navigation]);

  const handleSendMessage = async (content: string, replyTo?: string) => {
    try {
      await sendMessage(content, replyTo);
    } catch (error) {
      Toast.show('Failed to send message', Toast.SHORT);
    }
  };

  const handleSendAttachment = async (file: any, type: AttachmentType) => {
    try {
      await sendAttachment(file, type);
    } catch (error) {
      Toast.show('Failed to send attachment', Toast.SHORT);
    }
  };

  const handleTyping = (isTyping: boolean) => {
    sendTypingStatus(isTyping);
  };

  // Show error toast
  useEffect(() => {
    if (error) {
      Toast.show(error, Toast.SHORT);
    }
  }, [error]);

  // Wait for service to be ready
  if (!isServiceReady || loading) {
    return <LoadingScreen />;
  }

  console.log("📩 Passing messages to ChatInboxUI:", {
  count: messages.length,
  messageIds: messages.map(m => m.id),
  senders: messages.map(m => m.senderId),
  types: [...new Set(messages.map(m => m.type))], // unique types
});

  return (
    <ChatInboxUi
      jobId={jobId}
      jobTitle={jobTitle}
      userName={userName}
      isOnline={isOnline}
      isBlocked={isBlocked}
      messages={messages}
      sending={sending}
      connected={connected}
      typing={typing}
      conversationId={conversationId}
      currentUserId={userData?.userId}
      onSendMessage={handleSendMessage}
      onSendAttachment={handleSendAttachment}
      onLoadMore={loadMore}
      onTyping={handleTyping}
      navigation={props.navigation}
    />
  );
};

export default ChatInboxContainer;