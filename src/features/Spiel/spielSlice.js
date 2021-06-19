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
        toggleSpieler: (state, action) => {
            state.spieler === 'rot' ? state.spieler = 'gelb' : state.spieler = 'rot'
        },
        changeFarbe: (state, action) => {
            const feld = state.felder.filter(f => f.feldKey === action.payload.feldKey)[0]
            const newFarbe = action.payload.farbe
            feld.farbe = newFarbe
        },
        changeIsNextField: (state, action) => {
            const feld = state.felder.filter(f => f.feldKey === action.payload)[0]
            feld.isNextField = false
        },
        changeToNextField: (state, action) => {
            const nextField = state.felder.filter(f => f.feldKey === action.payload)[0]
            nextField.isNextField = true
        },
        setWinner: (state, action) => {
            const farbe = state.spieler

        }
    }
})

export const selectSpieler = state => state.spiel.spieler

export default spielSlice.reducer
export const {toggleSpieler, changeFarbe, changeIsNextField, changeToNextField, setWinner} = spielSlice.actions