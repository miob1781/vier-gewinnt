import { createSlice } from '@reduxjs/toolkit'

let felder = {}
for (let i=1; i<43; i++) {
    let feldKey = 'feld' + i.toString()
    let row = Math.floor(i / 7) + 1

    let col
    i % 6 === 0 ? col = 6 : col = i % 6

    let isNextField
    row === 6 ? isNextField = true : isNextField = false

    felder[feldKey] = {
        feld: feldKey,
        row: row,
        col: col,
        farbe: 'leer',
        isNextField: isNextField
    }
}

export const spielSlice = createSlice({
    name: 'spiel',
    initialState: {
        felder: felder,
        spieler: 'rot',
        status: 'laufend'
    },
    reducers: {
        insertStein: (state, action) => {
            const feldKey = action.payload.feld
            state.felder[feldKey].farbe = action.payload.farbe
            state.spieler === 'rot' ? state.spieler = 'gelb' : state.spieler = 'rot'
        }
    }
})

export const selectSpieler = state => state.spiel.spieler

export default spielSlice.reducer
export const {insertStein} = spielSlice.actions