import { getDateNowXXYY } from "@/shared/getDateXXYY";
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createPersistSlice } from "@shared/rtk-persist"

type Journal = { date: string; b: number; zh: number; u: number }

const initialState: { history: Journal[] } = { history: [{ date: getDateNowXXYY(), b: 0, zh: 0, u: 0 }] }

const historySlice = createPersistSlice(
  createSlice({
    name: "history",
    initialState,
    reducers: {
      eat(state, { payload }: PayloadAction<Journal>) {
        const { b, zh, u, date } = payload
        const dayIndex = state.history.findIndex(e => e.date === date)
        if (dayIndex < 0) {
          state.history.push(payload)
        } else {
          const prev = state.history[dayIndex]
          state.history[dayIndex] = { date, b: prev.b + b, zh: prev.zh + zh, u: prev.u + u }
        }
      },
    },
  }),
)

export const { eat } = historySlice.actions
export default historySlice
