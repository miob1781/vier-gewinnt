import { createSlice } from "@reduxjs/toolkit";

export const menueSlice = createSlice({
    name: 'menue',
    initialState: {
        spielmodus: '',
        farbe: '',
        isDisabled: true,
        text: '',
        computerSpielt: 'spieltNicht'
    },
    reducers: {
        setSpielmodus: (state, action) => {
            state.spielmodus = action.payload
        },
        setComputerSpielt: (state, action) => {
            state.computerSpielt = action.payload
        },
        setFarbe: (state, action) => {
            state.farbe = action.payload
        },
        setIsDisabled: (state, action) => {
            state.isDisabled = false
        },
        changeText: (state, action) => {
            state.text = action.payload
        }
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
export const {
    setSpielmodus,
    setFarbe,
    setIsDisabled,
    changeText,
    setComputerSpielt
} = menueSlice.actions;