import React from 'react'
import MainStack from './src/navigation/MainStack/MainStack'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/stores/Store/store';
const App: React.FC = () => {
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