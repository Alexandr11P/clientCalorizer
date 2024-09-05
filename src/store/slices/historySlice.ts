import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { baseURL, baseHeaders } from '../../baseParam'

type Journal = { date: string, b: number, zh: number, u: number };

const initialState: { status: string; state: Journal[] } = { status: '', state: [{ date: '', b: 0, zh: 0, u: 0 }] };

export const getHistory = createAsyncThunk('/eaten', async (data, { rejectWithValue }) => {
    try {
        const auth = localStorage.getItem('Auth')
        if (typeof auth === 'string') {
            const res = await fetch(`${baseURL}/eaten`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', ...JSON.parse(auth), ...baseHeaders
                }
            })
            if (res.ok) { return await res.json() } else { throw res.status }
        }
    } catch (err) {
        return rejectWithValue(`${err}`)
    }
})

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory(state, action: PayloadAction<[Journal]>) {
            state.state = action.payload
        },
    },
    extraReducers: (builder) => {

        builder.addCase(getHistory.fulfilled, (state, action) => { state.status = ''; state.state.splice(0, state.state.length, ...action.payload) })

        builder.addCase(getHistory.pending, (state, action) => { state.status = 'Загрузка' })

        builder.addCase(getHistory.rejected, (state, action) => {
            state.status = 'Error'
            console.log(action.payload)
            if (!['404', '500'].includes(`${action.payload}`)) {
                localStorage.removeItem('Auth'); window.location.reload()
            }
        })
    },

})

export const { setHistory } = historySlice.actions
export default historySlice