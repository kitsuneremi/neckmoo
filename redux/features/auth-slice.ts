import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const auth = createSlice({
    name: 'auth',
    initialState: null,
    reducers: {
        logIn: (state, action: PayloadAction) => {
            return {
                accessToken: '',
                createdAt: Date.now(),
                email: '',
                name: '',
                updateAt: Date.now(),
                username: '',
                isAdmin: false,
            }
        },
        logOut: () => {
            return null;
        }
    }
})