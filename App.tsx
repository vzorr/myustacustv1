import React, { useEffect, useState } from 'react'
import MainStack from './src/navigation/MainStack/MainStack'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/stores/Store/store';
import { ConversationContext } from './src/config/context/ConversationContext';
import io from "socket.io-client";

// Main App component with providers
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* <ConversationContext.Provider value={socket}> */}
            <MainStack />
          {/* </ConversationContext.Provider> */}
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;