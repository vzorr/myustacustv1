// hooks/useChatInitialization.ts
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState, AppStateStatus } from 'react-native';
import { chatService } from '../services/ChatService';

export const useChatInitialization = () => {
  const { userData, isLoggedIn } = useSelector((state: any) => state?.userInfo);

  useEffect(() => {
    let isInitializing = false;

    const initializeChat = async () => {
      if (isInitializing || !isLoggedIn || !userData?.userId || !userData?.token) {
        return;
      }

      isInitializing = true;

      try {
        if (chatService.isConnected()) {
          console.log('✅ Chat service already connected');
          return;
        }

        const sessionRecovered = await chatService.recoverSession();
        
        if (!sessionRecovered) {
          await chatService.initialize(
            userData.userId,
            userData.userType || userData.role || 'customer',
            userData.token
          );
          console.log('✅ Chat service initialized');
        }
      } catch (error) {
        console.error('❌ Failed to initialize chat:', error);
      } finally {
        isInitializing = false;
      }
    };

    if (isLoggedIn && userData) {
      initializeChat();
    } else if (!isLoggedIn && chatService.isConnected()) {
      chatService.disconnect?.() || chatService.cleanup?.();
    }
  }, [isLoggedIn, userData]);

  // Handle app state changes
  useEffect(() => {
    if (!isLoggedIn || !userData?.token) return;

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && !chatService.isConnected()) {
        chatService.initialize(
          userData.userId,
          userData.userType || userData.role || 'customer',
          userData.token
        ).catch(console.error);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [isLoggedIn, userData]);
};