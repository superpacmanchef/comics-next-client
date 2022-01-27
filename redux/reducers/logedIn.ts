/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface LogedState {
    logedIn: boolean
}

// Thunk used to get weather loged in or not
// export const getLogedAsync = createAsyncThunk('loged/getLoged', async () => {
//     const response = await getLoged()
//     if (response !== false) {
//         return response
//     }
//     return false
// })

const initialState: LogedState = {
    logedIn: false,
}

const logedSlice = createSlice({
    name: 'loged',
    initialState,
    reducers: {
        logedTrue: (state) => {
            state.logedIn = true
        },
        logedFalse: (state) => {
            state.logedIn = false
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(getLogedAsync.fulfilled, (state, action) => {
    //         state.logedIn = action.payload
    //     })
    // },
})

export const { logedTrue, logedFalse } = logedSlice.actions

export const getLogedState = (state: RootState) => state.loged.logedIn

export default logedSlice.reducer
