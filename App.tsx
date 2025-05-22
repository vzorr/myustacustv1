// =====================================================
// FILE: src/App.tsx (Updated to include chat cleanup)
// =====================================================

import React, { useEffect, useState } from 'react'
import MainStack from './src/navigation/MainStack/MainStack'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/stores/Store/store';
import { chatService } from './src/services/ChatService';
import { AppState } from 'react-native';

const App: React.FC = () => {
  useEffect(() => {
    // Handle app state changes for chat service
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        // App is going to background, cleanup chat service
        chatService.cleanup();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      subscription?.remove();
      // Final cleanup when app unmounts
      chatService.cleanup();
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
  )
}

export default App