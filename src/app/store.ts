import {configureStore} from '@reduxjs/toolkit';
import spielReducer from '../features/Spiel/spielSlice'

export const store = configureStore({
    reducer: {
        spiel: spielReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
