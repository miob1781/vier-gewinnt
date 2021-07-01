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

    hasWon =
        feld1.farbe === spieler &&
        feld2.farbe === spieler &&
        feld3.farbe === spieler &&
        feld4.farbe === spieler

    return hasWon
}

export const checkHasWon = (felder, spieler) => {
    let hasWon = false
    let toChange = 'down'
    for (let c=1; c<8; c++) {
        for (let r=1; r<4; r++) {
            hasWon = checkSeries(c, r, felder, spieler, toChange, hasWon)
            if (hasWon) {
                return hasWon
            }
        }
    }
    toChange = 'right'
    for (let c=1; c<5; c++) {
        for (let r=1; r<7; r++) {
            hasWon = checkSeries(c, r, felder, spieler, toChange, hasWon)
            if (hasWon) {
                return hasWon
            }
        }
    }
    toChange = 'downRight'
    for (let c=1; c<5; c++) {
        for (let r=1; r<4; r++) {
            hasWon = checkSeries(c, r, felder, spieler, toChange, hasWon)
            if (hasWon) {
                return hasWon
            }
        }
    }
    toChange = 'upRight'
    for (let c=1; c<5; c++) {
        for (let r=4; r<7; r++) {
            hasWon = checkSeries(c, r, felder, spieler, toChange, hasWon)
            if (hasWon) {
                return hasWon 
            }
        }
    }
    return hasWon
}

const getFieldsNextMove = (felder, feld, player) => {
    const fieldsNextMove = felder.map(f => {
        if (f.feldKey === feld.feldKey) {
            return {...f, farbe: player}
        } else {
            return f
        }
    })
    return fieldsNextMove
}

const checkFields = (felder, nextFields, player) => {
    for (let feld of nextFields) {
        const fieldsNextMove = getFieldsNextMove(felder, feld, player)
        const playerHasWon = checkHasWon(fieldsNextMove, player)
        if (playerHasWon) {
            return feld
        }
    }
}

const checkFieldsNextMove = (felder, feld, spieler, gegner, reihe) => {
    let wessenReihe
    reihe === spieler ? wessenReihe = spieler : wessenReihe = gegner
    let fieldsNextMove = getFieldsNextMove(felder, feld, spieler)
    const gegnerField = felder.filter(f => f.row === feld.row - 1 && f.col === feld.col)[0]
    fieldsNextMove = getFieldsNextMove(fieldsNextMove, gegnerField, wessenReihe)
    let hasWon = checkHasWon(fieldsNextMove, wessenReihe)
    return hasWon
}

export const getComputerZug = (felder, spieler) => {
    let field, gegner
    spieler === 'rot' ? gegner = 'gelb' : gegner = 'rot'
    let nextFields = felder.filter(f => f.isNextField)

    // finds winning move
    field = checkFields(felder, nextFields, spieler)
    if (field) {
        return field
    }

    // averts loss
    field = checkFields(felder, nextFields, gegner)
    if (field) {
        return field
    }
    // checks for moves that would lead to immediate loss
    let fieldsNextMove = nextFields.filter(f =>
        f.row === 1 || !checkFieldsNextMove(felder, f, spieler, gegner, gegner))
    if (fieldsNextMove.length > 0) {
        nextFields = fieldsNextMove
    }

    // averts destroying one's own opportunities
    fieldsNextMove = nextFields.filter(f =>
        f.row === 1 || !checkFieldsNextMove(felder, f, spieler, gegner, spieler))
    if (fieldsNextMove.length > 0) {
        nextFields = fieldsNextMove
    }

    // averts ground row loss
    const threatGroundRow = felder.filter(f => f.row === 6 && f.farbe === gegner).length === 2
        && felder.filter(f => f.row === 6 && f.farbe === spieler).length === 0
    if (threatGroundRow) {
        nextFields = nextFields.filter(f => f.row === 6 && f.col > 1 && f.col < 7)
    }

    // prefers middle
    const middleIsUsable = nextFields.find(f => f.col === 4 && f.row !== 1)
    if (middleIsUsable) {
        field = nextFields.filter(f => f.col === 4)[0]
        return field
    }

    // selects randomly
    let indexField = Math.floor(Math.random() * nextFields.length)
    //alert(indexField)
    field = nextFields[indexField]
    return field
}