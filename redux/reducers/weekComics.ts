/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface LogedState {
    last: Comic_ShortBoxed_SplitTitle_Image[]
    current: Comic_ShortBoxed_SplitTitle_Image[]
    next: Comic_ShortBoxed_SplitTitle_Image[]
}

const initialState: LogedState = {
    last: [],
    current: [],
    next: [],
}

const logedSlice = createSlice({
    name: 'loged',
    initialState,
    reducers: {
        setLast: (state, action) => {
            state.last = []
            state.last = [...action.payload]
        },
        setCurrent: (state, action) => {
            state.current = action.payload
        },
        setNext: (state, action) => {
            state.next = action.payload
        },
        setLastImage: (state, action) => {
            if (state.last.length > 0) {
                state.last[action.payload.index].image = action.payload.image
            }
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(getLogedAsync.fulfilled, (state, action) => {
    //         state.logedIn = action.payload
    //     })
    // },
})

export const { setLast, setCurrent, setNext, setLastImage } = logedSlice.actions

export const getWeekState = (state: RootState) => state.weekComics.last
export default logedSlice.reducer
