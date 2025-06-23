import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './Redux/pasteSlice'

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;