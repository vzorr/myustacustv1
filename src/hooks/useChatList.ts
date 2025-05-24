import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { chatService } from '../services/ChatService';
import { ChatRoom } from '../types/chat';

export const useChatList = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { userData } = useSelector((state: any) => state?.userInfo);
  const { token } = useSelector((state: any) => state?.accessToken);

  const loadChatRooms = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const userToken = token || userData?.token;
      if (!userToken || !userData?.userId) return;

      // Initialize if needed
      if (!chatService.isConnected()) {
        await chatService.initialize(userData.userId, userToken);
      }

      const rooms = await chatService.getChatRooms();
      setChatRooms(rooms);
    } catch (error) {
      console.error('Failed to load chat rooms:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadChatRooms();
  }, [token, userData]);

  const refresh = () => {
    loadChatRooms(true);
  };

  return {
    chatRooms,
    loading,
    refreshing,
    refresh
  };
};