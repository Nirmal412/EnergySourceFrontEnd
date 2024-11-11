import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import authSlice from './slices/auth.slice'

const persistAuthConfig = {
  key: 'auth',
  storage,
}

const authentication = persistReducer(persistAuthConfig, authSlice)

export const store = configureStore({
  reducer: {
    auth: authentication,
  },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export const persistor = persistStore(store)
