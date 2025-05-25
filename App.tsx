// =====================================================
// FILE: src/App.tsx (Fixed version)
// =====================================================

import React, { useEffect } from 'react';
import MainStack from './src/navigation/MainStack/MainStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/stores/Store/store';
import { chatService } from './src/services/ChatService';
import { AppState, AppStateStatus } from 'react-native';

// Main App Component
const App: React.FC = () => {
  useEffect(() => {
    // Check for session recovery on app start
    const initializeApp = async () => {
      try {
        const hasSession = await chatService.recoverSession();
        console.log('🔍 Session recovery check:', hasSession ? 'Found' : 'Not found');
      } catch (error) {
        console.error('Error during app initialization:', error);
      }
    };

    initializeApp();

    // Handle app state changes
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        // App is going to background
        console.log('📱 App going to background');
        // Note: We're not disconnecting to maintain connection
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      subscription?.remove();
      // Final cleanup when app unmounts
      console.log('🔄 App unmounting, cleaning up chat service...');
      // Use disconnect if available, otherwise use cleanup
      if (typeof chatService.disconnect === 'function') {
        chatService.disconnect();
      } else if (typeof chatService.cleanup === 'function') {
        chatService.cleanup();
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <MainStack />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;