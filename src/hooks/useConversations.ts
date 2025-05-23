// hooks/useConversations.ts - Hook for managing conversation list
import { useState, useEffect, useCallback, useRef } from 'react';
import { chatService } from '../services/ChatService';
import { ChatConversation } from '../types/chat';

interface UseConversationsReturn {
  conversations: ChatConversation[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  hasMore: boolean;
  searchTerm: string;
  totalUnread: number;
  unreadConversations: ChatConversation[];
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  search: (term: string) => Promise<void>;
  markConversationAsRead: (conversationId: string) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;
  pinConversation: (conversationId: string, isPinned: boolean) => Promise<void>;
  muteConversation: (conversationId: string, isMuted: boolean) => Promise<void>;
}

export function useConversations(): UseConversationsReturn {
  // State
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalUnread, setTotalUnread] = useState(0);

  // Refs
  const isLoadingRef = useRef(false);

  // Load conversations
  const loadConversations = useCallback(async (pageNum: number = 1, isRefresh: boolean = false) => {
    if (isLoadingRef.current && !isRefresh) return;
    
    try {
      isLoadingRef.current = true;
      
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Check if chat service is connected
      if (!chatService.isConnected()) {
        throw new Error('Chat service not initialized');
      }

      const result = await chatService.getMyConversations(pageNum);
      
      if (pageNum === 1) {
        // Replace all conversations on first page or refresh
        setConversations(result.conversations);
      } else {
        // Append for pagination
        setConversations(prev => {
          // Avoid duplicates
          const existingIds = new Set(prev.map(c => c.id));
          const newConversations = result.conversations.filter(c => !existingIds.has(c.id));
          return [...prev, ...newConversations];
        });
      }
      
      setHasMore(result.hasMore);
      setPage(pageNum);

      // Update total unread count
      const unreadCount = await chatService.getTotalUnreadCount();
      setTotalUnread(unreadCount);

    } catch (err: any) {
      setError(err.message || 'Failed to load conversations');
      console.error('❌ Load conversations error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
      isLoadingRef.current = false;
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadConversations(1);
  }, []);

  // Real-time updates - Listen for new messages to update conversation list
  useEffect(() => {
    const unsubscribeNewMessage = chatService.onNewMessage((message) => {
      // Update the conversation that received a new message
      setConversations(prev => {
        const updated = [...prev];
        const convIndex = updated.findIndex(c => c.id === message.conversationId);
        
        if (convIndex !== -1) {
          // Update existing conversation
          const conversation = { ...updated[convIndex] };
          conversation.lastMessage = message;
          conversation.updatedAt = message.timestamp;
          
          // Update unread count if message is from other user
          if (message.senderId !== chatService.userId) {
            conversation.unreadCount = (conversation.unreadCount || 0) + 1;
          }
          
          // Move to top of list
          updated.splice(convIndex, 1);
          updated.unshift(conversation);
        } else {
          // New conversation - refresh list
          loadConversations(1, true);
        }
        
        return updated;
      });

      // Update total unread count
      chatService.getTotalUnreadCount().then(setTotalUnread);
    });

    const unsubscribeUserStatus = chatService.onUserStatusChange((userId, isOnline) => {
      // Update user online status in conversations
      setConversations(prev => prev.map(conv => {
        if (conv.otherUser.id === userId) {
          return {
            ...conv,
            otherUser: {
              ...conv.otherUser,
              isOnline
            }
          };
        }
        return conv;
      }));
    });

    const unsubscribeConnection = chatService.onConnectionChange((connected) => {
      if (!connected) {
        setError('Connection lost. Reconnecting...');
      } else {
        setError(null);
        // Refresh when reconnected
        if (conversations.length > 0) {
          loadConversations(1, true);
        }
      }
    });

    return () => {
      unsubscribeNewMessage();
      unsubscribeUserStatus();
      unsubscribeConnection();
    };
  }, [loadConversations, conversations.length]);

  // Refresh conversations
  const refresh = useCallback(async () => {
    setSearchTerm('');
    await loadConversations(1, true);
  }, [loadConversations]);

  // Load more (pagination)
  const loadMore = useCallback(async () => {
    if (!loading && !refreshing && hasMore && !searchTerm) {
      await loadConversations(page + 1);
    }
  }, [loading, refreshing, hasMore, page, searchTerm, loadConversations]);

  // Search conversations
  const search = useCallback(async (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      // Reset to all conversations
      await loadConversations(1);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const results = await chatService.searchConversations(term);
      setConversations(results);
      setHasMore(false); // No pagination for search results
    } catch (err: any) {
      setError('Search failed');
      console.error('❌ Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [loadConversations]);

  // Mark conversation as read
  const markConversationAsRead = useCallback(async (conversationId: string) => {
    try {
      await chatService.markMessagesAsRead(conversationId);
      
      // Update local state
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, unreadCount: 0 }
          : conv
      ));

      // Update total unread
      const newTotal = await chatService.getTotalUnreadCount();
      setTotalUnread(newTotal);

    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  }, []);

  // Delete conversation (if your API supports it)
  const deleteConversation = useCallback(async (conversationId: string) => {
    try {
      // Call API to delete conversation
      // await chatApiService.deleteConversation(conversationId);
      
      // Remove from local state
      setConversations(prev => prev.filter(conv => conv.id !== conversationId));
      
      // Update unread count
      const newTotal = await chatService.getTotalUnreadCount();
      setTotalUnread(newTotal);
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      setError('Failed to delete conversation');
    }
  }, []);

  // Pin/unpin conversation (if your API supports it)
  const pinConversation = useCallback(async (conversationId: string, isPinned: boolean) => {
    try {
      // Call API to pin/unpin
      // await chatApiService.pinConversation(conversationId, isPinned);
      
      // Update local state
      setConversations(prev => prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, isPinned }
          : conv
      ));
    } catch (error) {
      console.error('Failed to pin conversation:', error);
      setError('Failed to update conversation');
    }
  }, []);

  // Mute/unmute conversation (if your API supports it)
  const muteConversation = useCallback(async (conversationId: string, isMuted: boolean) => {
    try {
      // Call API to mute/unmute
      // await chatApiService.muteConversation(conversationId, isMuted);
      
      // Update local state
      setConversations(prev => prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, isMuted }
          : conv
      ));
    } catch (error) {
      console.error('Failed to mute conversation:', error);
      setError('Failed to update conversation');
    }
  }, []);

  // Get unread conversations only
  const getUnreadConversations = useCallback(() => {
    return conversations.filter(conv => conv.unreadCount > 0);
  }, [conversations]);

  return {
    // Data
    conversations,
    loading,
    refreshing,
    error,
    hasMore,
    searchTerm,
    totalUnread,
    unreadConversations: getUnreadConversations(),

    // Actions
    refresh,
    loadMore,
    search,
    markConversationAsRead,
    deleteConversation,
    pinConversation,
    muteConversation,
  };
}