import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState: { status: boolean, content: string } = { status: false, content: '' }

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        visModal(state, action: PayloadAction<string>) {
            state.status = true;
            state.content = action.payload;
        },
        invisModal(state) {
            state.status = false;
            state.content = '';
        },
    },
})

export const { visModal, invisModal } = modalSlice.actions
export default modalSlice 