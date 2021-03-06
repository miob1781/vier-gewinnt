import {configureStore} from '@reduxjs/toolkit';
import menueReducer from '../features/Menue/menueSlice'
import spielReducer from '../features/Spiel/spielSlice'

export const store = configureStore({
    reducer: {
        menue: menueReducer,
        spiel: spielReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
