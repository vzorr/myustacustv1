import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userInfoReducer from '../reducer/userInfoReducer';
import AccountCreationReducer from '../reducer/AccountCreationReducer';
import UserTokenReducer from '../reducer/UserTokenReducer';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostJobReducer from '../reducer/PostJobReducer';
import GeneralMetaDataReducer from '../reducer/GeneralMetaDataReducer';
import UserProfileReducer from '../reducer/UserProfileReducer';
import FireBaseTokeReducer from '../reducer/FireBaseTokeReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['accessToken'],
};

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  accountCreation: AccountCreationReducer,
  accessToken: UserTokenReducer,
  postJob: PostJobReducer,
  metaData: GeneralMetaDataReducer,
  userProfile: UserProfileReducer,
  fireBaseToken: FireBaseTokeReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false
    }),

});

export const persistor = persistStore(store);
export default store;