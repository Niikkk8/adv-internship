import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userEmail: null,
    userSubscriptionStatus: null,
    userSavedBooks: [],
    userFinishedBooks: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userEmail = action.payload.userEmail
            state.userSubscriptionStatus = action.payload.userSubscriptionStatus
            state.userSavedBooks = action.payload.userSavedBooks
            state.userFinishedBooks = action.payload.userFinishedBooks
        },
        signOutUser: (state) => {
            state.userEmail = null
            state.userSubscriptionStatus = null
            state.userSavedBooks = []
            state.userFinishedBooks = []
        }
    }
});

export const { setUser, signOutUser } = userSlice.actions

export default userSlice.reducer