// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import { rtkApi } from "../api/rtkApi"

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
