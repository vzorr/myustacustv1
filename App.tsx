import React from 'react'
import MainStack from './src/navigation/MainStack/MainStack'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/stores/Store/store';
import { ConversationContext } from './src/config/context/ConversationContext';
import io from "socket.io-client";
import { BASE_SCOCKET_URL } from './src/apiManager/Client';
const App: React.FC = () => {
  // const { userData } = useSelector((state: any) => state?.userInfo)
  // const userInfo = userData
  // const socket = io(BASE_SCOCKET_URL, {
  //   transports: ['websocket'],
  //   // query: { userId: userInfo?.userId }
  //   // optional configurations
  // });
  // console.log("socket", socket)
  // socket.on('connect', () => {
  //   console.log('Socket connected:', socket.id);
  // });

  // // Optional: Listen for error
  // socket.on('connect_error', (err) => {
  //   console.error('Connection error:', err.message);
  // });

  // // Optional: Listen for disconnect
  // socket.on('disconnect', (reason) => {
  //   console.warn('Socket disconnected:', reason);
  // });
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
  )
}

export default App