import { combineSlices, configureStore } from "@reduxjs/toolkit"
import historySlice from "./slices/historySlice"
import productsSlice from "./slices/productsSlice"


const rootReducer = combineSlices(historySlice, productsSlice)

export const store = configureStore({
  reducer: rootReducer,
})

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type RootState = ReturnType<typeof rootReducer>
