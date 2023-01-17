// The Spiel slice is mainly used for actions during the game.
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Farbe, Spieler, SpielStatus, ZugStatus, Feld, SpielState} from '../../app/types'

// generates array of fields
let felder: Feld[] = []
let id: number = 0
let row: number, col: number
for (let i=1; i<7; i++) {
    row = i
    for (let j=1; j<8; j++) {
        col = j
        id++
        let feldKey: string = 'feld' + id.toString()
        let isNextField: boolean
        row === 6 ? isNextField = true : isNextField = false
        const feld: Feld = {
            feldKey: feldKey,
            row: row,
            col: col,
            farbe: Farbe.Leer,
            isNextField: isNextField
        }
        felder.push(feld)
    }
}

const initialState: SpielState = {
    felder: felder,
    spieler: Spieler.Rot,
    status: SpielStatus.VorSpiel,
    zug: -1,
    zugStatus: ZugStatus.Bereit,
    computerZieht: false
}

export const spielSlice = createSlice({
    name: 'spiel',
    initialState,
    reducers: {
        resetFelder: state => {
            state.felder = felder
        },
        resetSpieler: state => {
            state.spieler = Spieler.Rot
        },
        setComputerZieht: (state, action: PayloadAction<boolean>) => {
            state.computerZieht = action.payload
        },
        setStatus: (state, action: PayloadAction<SpielStatus>) => {
            state.status = action.payload
        },
        setZugStatus: (state, action: PayloadAction<ZugStatus>) => {
            state.zugStatus = action.payload
        },
        toggleSpieler: state => {
            state.spieler = state.spieler === Spieler.Rot ? Spieler.Gelb : Spieler.Rot
        },
        changeFarbe: (state, action: PayloadAction<{feldKey: string, farbe: Farbe}>) => {
            // Here and elsewhere, TypeScript warns that the values of feld could be undefined.
            // But since the callback always finds a matching feldkey, the warning can safely be ignored.
            // @ts-ignore
            const feld: Feld = state.felder.find((f: Feld) => f.feldKey === action.payload.feldKey)
            const newFarbe: Farbe = action.payload.farbe
            feld.farbe = newFarbe
        },
        setZug: (state, action: PayloadAction<string>) => {
            if (action.payload === 'add') {
                state.zug++
            } else if (action.payload === 'reset') {
                state.zug = 0
            }
        },
        changeIsNextField: (state, action: PayloadAction<string>) => {
            // @ts-ignore
            const feld: Feld = state.felder.find((f: Feld) => f.feldKey === action.payload)
            feld.isNextField = false
        },
        changeToNextField: (state, action: PayloadAction<string>) => {
            // @ts-ignore
            const nextField: Feld = state.felder.find((f: Feld) => f.feldKey === action.payload)
            nextField.isNextField = true
        },
        toggleComputerZieht: state => {
            state.computerZieht = !state.computerZieht
        }
    }
})

export default spielSlice.reducer
export const {
    resetFelder,
    resetSpieler,
    setComputerZieht,
    toggleSpieler,
    setZugStatus,
    changeFarbe,
    changeIsNextField,
    changeToNextField,
    setStatus,
    setZug,
    toggleComputerZieht
} = spielSlice.actions
