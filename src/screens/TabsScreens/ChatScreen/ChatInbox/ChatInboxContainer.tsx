import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { UserNavigationRootProps } from '../../../../types/stacksParams';
import { useChat } from '../../../../hooks/useChat';
import { AttachmentType } from '../../../../types/chat';
import ChatInboxUi from './ChatInboxUi';
import LoadingScreen from '../../../../components/Loader/LoadingScreen';
import Toast from 'react-native-simple-toast';
import { ChatService } from '../../../../apiManager/Client';
import { useSelector } from 'react-redux';

const ChatInboxContainer: React.FC<UserNavigationRootProps<"ChatInbox">> = (props) => {
  const { userData } = useSelector((state: any) => state?.userInfo);
  const chatData = props?.route?.params?.chatData;
  const { otherUserId, jobId, jobTitle, userName, isOnline, isBlocked }: any = chatData;

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
    conversationId
  } = useChat({
    roomId: jobId,
    receiverId: otherUserId,
    jobTitle: jobTitle
  });


useEffect(() => {
  if (!loading && connected) {
    markAsRead();
  }
}, [loading, connected, markAsRead]);

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

if (loading) {
  return <LoadingScreen />;
}

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
    onSendMessage={handleSendMessage}
    onSendAttachment={handleSendAttachment}
    onLoadMore={loadMore}
    onTyping={handleTyping}
    navigation={props.navigation}
  />
);
};

export default ChatInboxContainer;