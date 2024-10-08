import { configureStore } from "@reduxjs/toolkit"
import menuReducer from './menuSlice'

export const store = configureStore({
  reducer: {
    menues:menuReducer,
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch