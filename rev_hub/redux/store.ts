import {createSlice, configureStore, PayloadAction, createListenerMiddleware} from "@reduxjs/toolkit";


const listenerMiddleware = createListenerMiddleware()

type UserSlice = {
    id: number | null
};
const userSlice = createSlice({
    name: "userSlice",
    initialState: { id: null } as UserSlice,
    reducers: {
        setUser: (state, action: PayloadAction<number|null>) => {
            state.id = action.payload
        }
    }
})

export const {setUser} = userSlice.actions

export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type State_t = ReturnType<typeof store.getState>