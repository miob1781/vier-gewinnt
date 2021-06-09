import { createSlice } from "@reduxjs/toolkit";

export const menueSlice = createSlice({
    name: 'menue',
    initialState: {
        spielmodus: '',
        farbe: '',
        isReady: false
    },
    reducers: {
        toggleSpielmodus: (state, action) => {
            state.spielmodus = action.payload
        },
        toggleFarbe: (state, action) => {
            state.farbe = action.payload
        },
        toggleIsReady: (state) => {
            state.isReady = true
        },
    }
})

export const selectSpielmodus = (state) => state.menue.spielmodus
export const selectFarbe = (state) => state.menue.farbe
export const selectIsReady = (state) => state.menue.isReady

export const selectDisplayFarbe = (state) => {
    if (state.menue.spielmodus === 'allein') {
        return {display: 'block'}
    } return {display: 'none'}
}

export default menueSlice.reducer;
export const { toggleSpielmodus, toggleFarbe, toggleIsReady } = menueSlice.actions;