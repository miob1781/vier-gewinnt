const getFeld = (felder, row, col) => {
    const feld = felder.filter(f => f.row === row && f.col === col)[0]
    return feld
}

const checkSeries = (c, r, felder, spieler, toChange, hasWon) => {
    let row1, row2, row3, row4, col1, col2, col3, col4

    switch (toChange) {
        case 'down':
            row1 = r
            row2 = r + 1
            row3 = r + 2
            row4 = r + 3
            col1 = c
            col2 = c
            col3 = c
            col4 = c
            break
        case 'right':
            row1 = r
            row2 = r
            row3 = r
            row4 = r
            col1 = c
            col2 = c + 1
            col3 = c + 2
            col4 = c + 3
            break
        case 'downRight':
            row1 = r
            row2 = r + 1
            row3 = r + 2
            row4 = r + 3
            col1 = c
            col2 = c + 1
            col3 = c + 2
            col4 = c + 3
            break
        case 'upRight':
            row1 = r
            row2 = r - 1
            row3 = r - 2
            row4 = r - 3
            col1 = c
            col2 = c + 1 
            col3 = c + 2
            col4 = c + 3
            break
    }
    let feld1 = getFeld(felder, row1, col1)
    let feld2 = getFeld(felder, row2, col2)
    let feld3 = getFeld(felder, row3, col3)
    let feld4 = getFeld(felder, row4, col4)

    if (
        feld1.farbe === spieler &&
        feld2.farbe === spieler &&
        feld3.farbe === spieler &&
        feld4.farbe === spieler
        ) {
        hasWon = true
        return hasWon
    }
}

export const checkHasWon = (felder, spieler) => {
    let hasWon = false
    let toChange = 'down'
    for (let c=1; c<8; c++) {
        for (let r=1; r<4; r++) {
            checkSeries(c, r, felder, spieler, toChange, hasWon)
        }
    }
    toChange = 'right'
    for (let c=1; c<5; c++) {
        for (let r=1; r<7; r++) {
            checkSeries(c, r, felder, spieler, toChange, hasWon)
        }
    }
    toChange = 'downRight'
    for (let c=1; c<5; c++) {
        for (let r=1; r<4; r++) {
            checkSeries(c, r, felder, spieler, toChange, hasWon)
        }
    }
    toChange = 'upRight'
    for (let c=1; c<5; c++) {
        for (let r=4; r<7; r++) {
            checkSeries(c, r, felder, spieler, toChange, hasWon)
        }
    }
    return hasWon
}