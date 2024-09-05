import { combineSlices, configureStore } from "@reduxjs/toolkit"
import historySlice from "./slices/historySlice"
import productsSlice from "./slices/productsSlice"
import modalSlice from "./slices/modalSlice"


const rootReducer = combineSlices(historySlice, productsSlice, modalSlice)

export const store = configureStore({
  reducer: rootReducer,
})


export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type RootState = ReturnType<typeof rootReducer>
