import { createSlice } from '@reduxjs/toolkit'

let felder = []
let id = 0
let row, col

for (let i=1; i<7; i++) {
    row = i
    for (let j=1; j<8; j++) {
        col = j
        id++
        let feldKey = 'feld' + id.toString()
        let isNextField
        row === 6 ? isNextField = true : isNextField = false
        
        felder.push({
            feldKey: feldKey,
            row: row,
            col: col,
            farbe: 'leer',
            isNextField: isNextField
        })
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
            const feld = action.payload
            feld.farbe = state.spieler
            feld.isNextField = false
            if (feld.row > 1) {
                felder.filter(f => f.col === feld.col && f.row === feld.row - 1)[0].isNextField = true
            }
            state.spieler === 'rot' ? state.spieler = 'gelb' : state.spieler = 'rot'
        },
        setWinner: (state, action) => {
            const farbe = state.spieler

        }
    }
})

export const selectSpieler = state => state.spiel.spieler

export default spielSlice.reducer
export const {insertStein} = spielSlice.actions