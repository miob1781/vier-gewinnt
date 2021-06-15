import { createSlice } from '@reduxjs/toolkit'

let initialState = {}
for (let i=1; i>43; i++) {
    let feldKey = ['feld' + i]
    let row = Math.floor(i / 7) + 1
    let col
    if (i % 6 === 0) {
        col = 6
    } else {
        col = i % 6
    }

    initialState[feldKey] = {
        feld: feldKey,
        row: row,
        col: col,
        farbe: 'leer'
    }
}

export const spielSlice = createSlice({
    name: 'spiel',
    initialState: initialState,
    reducers: {
        changeFarbe: (state, action) => {
            const feldKey = action.payload.feld
            state[feldKey].farbe = action.payload.farbe
        }
    }
})

export default spielSlice.reducer
export const {changeFarbe} = spielSlice.actions 