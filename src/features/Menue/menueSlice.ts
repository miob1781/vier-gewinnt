// The Menue slice is used for starting the game.
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Spielmodus, Spieler, MenueState} from '../../app/types'

const initialState: MenueState = {
    spielmodus: Spielmodus.Allein,
    farbe: Spieler.Rot,
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
        }
    }
})

export default menueSlice.reducer;
export const {
    setSpielmodus,
    setFarbe,
    setComputerSpielt
} = menueSlice.actions;
