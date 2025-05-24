// hooks/useChat.ts - Updated to work without init endpoints
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { chatService } from '../services/ChatService';
import { Message, AttachmentType, MessageStatus, MessageType } from '../types/chat';


interface UseChatProps {
  jobId: string;
  receiverId: string;
  conversationId?: string;
  jobTitle?: string;
}

interface UseChatReturn {
  conversationId: string;
  messages: Message[];
  loading: boolean;
  connected: boolean;
  sending: boolean;
  error: string | null;
  typing: { [userId: string]: boolean };
  hasMore: boolean;
  sendMessage: (text: string, replyTo?: string) => Promise<void>;
  sendAttachment: (file: any, type: AttachmentType) => Promise<void>;
  sendTypingStatus: (isTyping: boolean) => void;
  loadMore: () => Promise<void>;
  markAsRead: () => Promise<void>;
  retryMessage: (message: Message) => Promise<void>;
}

export function useChat({ 
  jobId, 
  receiverId, 
  conversationId: existingConversationId,
  jobTitle 
}: UseChatProps): UseChatReturn {
  // Get user data from Redux
  const { userData } = useSelector((state: any) => state?.userInfo);
  
  // State
  const [conversationId, setConversationId] = useState(existingConversationId || '');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typing, setTyping] = useState<{ [userId: string]: boolean }>({});
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Refs to avoid stale closures
  const conversationIdRef = useRef(conversationId);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initializingRef = useRef(false);

  // Update ref when conversationId changes
  useEffect(() => {
    conversationIdRef.current = conversationId;
  }, [conversationId]);

  // Initialize chat service if needed
  const ensureChatInitialized = async () => {
    if (chatService.isConnected()) {
      return true;
    }

    if (!userData?.userId || !userData?.token) {
      throw new Error('User not authenticated');
    }

    if (initializingRef.current) {
      // Wait for ongoing initialization
      let attempts = 0;
      while (initializingRef.current && attempts < 50) { // 5 seconds max
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }
      return chatService.isConnected();
    }

    initializingRef.current = true;
    
    try {
      // Try to recover session first
      const recovered = await chatService.recoverSession();
      
      if (!recovered) {
        // Initialize new session
        await chatService.initialize(
          userData.userId,
          userData.userType || userData.role || 'customer',
          userData.token
        );
      }
      
      return true;
    } catch (error) {
      console.error('Failed to initialize chat service:', error);
      throw error;
    } finally {
      initializingRef.current = false;
    }
  };

  // Initialize conversation and load messages
  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        setLoading(true);
        setError(null);

        // Ensure chat service is initialized
        try {
          await ensureChatInitialized();
        } catch (err: any) {
          if (mounted) {
            setError('Failed to connect to chat service');
            setLoading(false);
          }
          return;
        }

        // If we have a conversation ID, load messages
        if (existingConversationId) {
          try {
            const loadedMessages = await chatService.loadMessages(existingConversationId);
            if (mounted) {
              setMessages(loadedMessages);
              setCurrentPage(1);
              setHasMore(loadedMessages.length >= 50);
            }

            // Mark as read
            //await chatService.markMessagesAsRead(existingConversationId);
          } catch (err) {
            console.error('Failed to load messages:', err);
            if (mounted) {
              setMessages([]);
              // Don't show error for empty conversation
              if (err.response?.status !== 404) {
                setError('Failed to load messages');
              }
            }
          }
        } else {
          // New conversation - no messages yet
          if (mounted) {
            setMessages([]);
            // Generate a temporary conversation ID that will be replaced when first message is sent
            const tempConvId = `temp-${jobId}-${receiverId}-${Date.now()}`;
            setConversationId(tempConvId);
          }
        }

        // Check connection status
        if (mounted) {
          setConnected(chatService.isConnected());
        }

      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to initialize chat');
        }
        console.error('❌ Chat initialization error:', err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, [jobId, receiverId, existingConversationId, userData]);

  // Set up real-time listeners
  useEffect(() => {
    if (!conversationId) return;

    // Listen for new messages
    const unsubscribeMessage = chatService.onNewMessage((newMessage) => {
      // Update conversation ID if it was temporary
      if (conversationId.startsWith('temp-') && newMessage.conversationId) {
        setConversationId(newMessage.conversationId);
        conversationIdRef.current = newMessage.conversationId;
      }

      if (newMessage.conversationId === conversationIdRef.current || 
          (newMessage.jobId === jobId && newMessage.senderId === receiverId)) {
        setMessages(prev => {
          // Check if message already exists
          const exists = prev.find(m => m.id === newMessage.id);
          if (exists) {
            // Update existing message
            return prev.map(m => m.id === newMessage.id ? newMessage : m);
          }
          // Add new message
          return [newMessage, ...prev];
        });
        
        // Mark as read if from other user
        if (newMessage.senderId === receiverId) {
          //chatService.markMessagesAsRead(newMessage.conversationId, [newMessage.id]);
        }
      }
    });

    // Listen for message status updates
    const unsubscribeStatus = chatService.onMessageRead((messageId, status) => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status } : msg
      ));
    });

    // Listen for connection status
    const unsubscribeConnection = chatService.onConnectionChange((isConnected) => {
      setConnected(isConnected);
      if (!isConnected) {
        setError('Connection lost. Reconnecting...');
      } else {
        setError(null);
      }
    });

    // Listen for typing status
    const unsubscribeTyping = chatService.onTyping((userId, isTyping) => {
      setTyping(prev => ({ ...prev, [userId]: isTyping }));
      
      // Clear typing after 3 seconds
      if (isTyping) {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          setTyping(prev => ({ ...prev, [userId]: false }));
        }, 3000);
      }
    });

    // Listen for errors
    const unsubscribeError = chatService.onError((error) => {
      setError(error.message || 'An error occurred');
    });

    // Cleanup
    return () => {
      unsubscribeMessage();
      unsubscribeStatus();
      unsubscribeConnection();
      unsubscribeTyping();
      unsubscribeError();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [conversationId, receiverId, jobId]);

  // Send text message
  const sendMessage = useCallback(async (text: string, replyTo?: string) => {
    if (!text.trim()) return;

    try {
      setSending(true);
      setError(null);

      // Ensure service is connected
      await ensureChatInitialized();

      // If conversation ID is temporary, we'll send without it and let backend create it
      const isNewConversation = !conversationId || conversationId.startsWith('temp-');
      
      if (isNewConversation) {
        // For new conversations, we need to send with jobId and receiverId
        // The backend should create the conversation and return the real ID
        const tempMessage: Message = {
          id: `temp-${Date.now()}`,
          senderId: userData.userId,
          receiverId: receiverId,
          content: text,
          timestamp: new Date().toISOString(),
          type: MessageType.TEXT,
          status: MessageStatus.SENDING,
          replyTo,
          conversationId: conversationId,
          jobId: jobId
        };

        // Add to UI immediately
        setMessages(prev => [tempMessage, ...prev]);

        // Send without conversation ID, let backend handle it
        try {
          // We'll need to modify sendTextMessage to handle this case
          // For now, create a temporary conversation ID
          const realConvId = await chatService.createConversationAndSendMessage(
            jobId,
            receiverId,
            text,
            replyTo
          );

          // Update conversation ID
          setConversationId(realConvId);
          conversationIdRef.current = realConvId;

          // Update message with real conversation ID
          setMessages(prev => prev.map(msg => 
            msg.id === tempMessage.id 
              ? { ...msg, conversationId: realConvId, status: MessageStatus.SENT }
              : msg
          ));
        } catch (err) {
          // Mark message as failed
          setMessages(prev => prev.map(msg => 
            msg.id === tempMessage.id 
              ? { ...msg, status: MessageStatus.FAILED }
              : msg
          ));
          throw err;
        }
      } else {
        // Existing conversation, send normally
        await chatService.sendTextMessage(conversationId, text, receiverId, replyTo);

        // Update local messages
        setMessages(chatService.getLocalMessages(conversationId));
      }

    } catch (err: any) {
      setError('Failed to send message');
      console.error('❌ Send message error:', err);
      throw err;
    } finally {
      setSending(false);
    }
  }, [conversationId, receiverId, jobId, userData]);

  // Send attachment
  const sendAttachment = useCallback(async (file: any, type: AttachmentType) => {
    try {
      setSending(true);
      setError(null);

      // Ensure service is connected
      await ensureChatInitialized();

      const isNewConversation = !conversationId || conversationId.startsWith('temp-');

      if (isNewConversation) {
        // Create conversation with first attachment
        const realConvId = await chatService.createConversationAndSendAttachment(
          jobId,
          receiverId,
          file,
          type
        );

        setConversationId(realConvId);
        conversationIdRef.current = realConvId;

        // Load messages for new conversation
        const messages = await chatService.loadMessages(realConvId);
        setMessages(messages);
      } else {
        // Existing conversation
        await chatService.sendAttachment(conversationId, file, type, receiverId);

        // Update local messages
        setMessages(chatService.getLocalMessages(conversationId));
      }

    } catch (err: any) {
      setError('Failed to send attachment');
      console.error('❌ Send attachment error:', err);
      throw err;
    } finally {
      setSending(false);
    }
  }, [conversationId, receiverId, jobId, userData]);

  // Send typing indicator
  const sendTypingStatus = useCallback((isTyping: boolean) => {
    if (conversationId && !conversationId.startsWith('temp-') && connected) {
      chatService.sendTypingIndicator(conversationId, receiverId, isTyping);
    }
  }, [conversationId, receiverId, connected]);

  // Load more messages (pagination)
  const loadMore = useCallback(async () => {
    if (!conversationId || conversationId.startsWith('temp-') || !hasMore || loading) return;
    
    try {
      const nextPage = currentPage + 1;
      const updatedMessages = await chatService.loadMessages(conversationId, nextPage);
      
      setMessages(updatedMessages);
      setCurrentPage(nextPage);
      
      // Check if there are more messages
      const newMessagesCount = updatedMessages.length - messages.length;
      setHasMore(newMessagesCount >= 50);
    } catch (err) {
      console.error('❌ Failed to load more messages:', err);
      setError('Failed to load more messages');
    }
  }, [conversationId, messages.length, currentPage, hasMore, loading]);

  // Mark messages as read
  const markAsRead = useCallback(async () => {
    if (conversationId && !conversationId.startsWith('temp-')) {
      try {
        //await chatService.markMessagesAsRead(conversationId);
      } catch (err) {
        console.error('Failed to mark as read:', err);
      }
    }
  }, [conversationId]);

  // Retry failed message
  const retryMessage = useCallback(async (message: Message) => {
    if (message.status !== MessageStatus.FAILED) return;

    try {
      // Remove failed message
      setMessages(prev => prev.filter(m => m.id !== message.id));
      
      // Resend based on type
      if (message.attachments && message.attachments.length > 0) {
        // Retry attachment - you'll need to store the original file
        setError('Please select the file again to retry');
      } else {
        // Retry text message
        await sendMessage(message.content, message.replyTo);
      }
    } catch (err) {
      console.error('Failed to retry message:', err);
    }
  }, [sendMessage]);

  return {
    // State
    conversationId: conversationId.startsWith('temp-') ? '' : conversationId,
    messages,
    loading,
    connected,
    sending,
    error,
    typing,
    hasMore,

    // Actions
    sendMessage,
    sendAttachment,
    sendTypingStatus,
    loadMore,
    markAsRead,
    retryMessage,
  };
}