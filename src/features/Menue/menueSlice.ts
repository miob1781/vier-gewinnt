// The Menue slice is used for starting the game.
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {Spielmodus, Spieler, MenueState} from '../../app/types'

const initialState: MenueState = {
    spielmodus: Spielmodus.Unset,
    farbe: Spieler.Rot,
    isDisabled: true,
    computerSpielt: Spieler.Gelb
}

export const menueSlice = createSlice({
    name: 'menue',
    initialState,
    reducers: {
        setSpielmodus: (state, action: PayloadAction<Spielmodus>) => {
            state.spielmodus = action.payload
        },
        setComputerSpielt: (state, action: PayloadAction<Spieler>) => {
            state.computerSpielt = action.payload
        },
        setFarbe: (state, action: PayloadAction<Spieler>) => {
            state.farbe = action.payload
        },
        setIsDisabled: (state, action) => {
            state.isDisabled = false
        }
    }
})

export const selectDisplayFarbe = (state: RootState): {display: string} => {
    return state.menue.spielmodus === Spielmodus.Allein ? {display: 'block'} : {display: 'none'}
}

export default menueSlice.reducer;
export const {
    setSpielmodus,
    setFarbe,
    setIsDisabled,
    setComputerSpielt
} = menueSlice.actions;
