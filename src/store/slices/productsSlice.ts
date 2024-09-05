import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Prod = {
    id: number | string,
    name: string,
    b: number,
    zh: number,
    u: number,
    k?: number
}

const initialState: { original: Prod[], filters: Prod[] } = {
    original: [],
    filters: [{
        id: 0,
        name: 'loading',
        b: 0,
        zh: 0,
        u: 0,
    }]
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<[Prod]>) {
            state.original = action.payload
            state.filters = action.payload
        },
        find(state, action: PayloadAction<string>) {
            state.filters = state.original
                .filter((e) => e.name.toLowerCase().includes(action.payload.toLowerCase()))
        },
    },
})

export const { setProducts, find } = productsSlice.actions
export default productsSlice 