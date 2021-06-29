import { createSlice } from '@reduxjs/toolkit'
import {hasWon} from './spielFunctions.js'

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
        status: 'vorSpiel',
        newGame: false,
        zug: 0
    },
    reducers: {
        resetFelder: (state, action) => {
            state.felder = felder
        },
        resetSpieler: (state, action) => {
            state.spieler = 'rot'
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        toggleSpieler: (state, action) => {
            state.spieler === 'rot' ? state.spieler = 'gelb' : state.spieler = 'rot'
        },
        changeFarbe: (state, action) => {
            const feld = state.felder.filter(f => f.feldKey === action.payload.feldKey)[0]
            const newFarbe = action.payload.farbe
            feld.farbe = newFarbe
        },
        setZug: (state, action) => {
            if (action.payload === 'add') {
                state.zug++
            } else if (action.payload === 'reset') {
                state.zug = 0
            }
        },
        changeIsNextField: (state, action) => {
            const feld = state.felder.filter(f => f.feldKey === action.payload)[0]
            feld.isNextField = false
        },
        changeToNextField: (state, action) => {
            const nextField = state.felder.filter(f => f.feldKey === action.payload)[0]
            nextField.isNextField = true
        },
        toggleHasWon: (state, action) => {
            state.hasWon = true
        },
        toggleNewGame: (state, action) => {
            state.newGame ? state.newGame = false : state.newGame = true
        }
    }
})

export default spielSlice.reducer
export const {
    resetFelder,
    resetSpieler,
    toggleSpieler,
    changeFarbe,
    changeIsNextField,
    changeToNextField,
    setWinner,
    setStatus,
    toggleNewGame,
    setZug
} = spielSlice.actions