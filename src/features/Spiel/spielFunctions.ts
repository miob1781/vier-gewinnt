// functions to get a computer move and find a winner
import {Feld, Spieler, Farbe, ToChange} from '../../app/types'

const getFeld = (felder: Feld[], row: number, col: number): Feld => {
    const feld: Feld = felder.find(f => f.row === row && f.col === col)!
    return feld
}

const compareFarbeSpieler = (spieler: Spieler, farbe: Farbe): boolean => {
    return (spieler === Spieler.Rot && farbe === Farbe.Rot)
    || (spieler === Spieler.Gelb && farbe === Farbe.Gelb)
}

const checkSeries = (c: number, r: number, felder: Feld[], spieler: Spieler, toChange: ToChange, hasWon: boolean): boolean => {
    let row1: number, row2: number, row3: number, row4: number, col1: number, col2: number, col3: number, col4: number
    switch (toChange) {
        case ToChange.Down:
            row1 = r
            row2 = r + 1
            row3 = r + 2
            row4 = r + 3
            col1 = c
            col2 = c
            col3 = c
            col4 = c
            break
        case ToChange.Right:
            row1 = r
            row2 = r
            row3 = r
            row4 = r
            col1 = c
            col2 = c + 1
            col3 = c + 2
            col4 = c + 3
            break
        case ToChange.DownRight:
            row1 = r
            row2 = r + 1
            row3 = r + 2
            row4 = r + 3
            col1 = c
            col2 = c + 1
            col3 = c + 2
            col4 = c + 3
            break
        case ToChange.UpRight:
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
    let feld1: Feld = getFeld(felder, row1, col1)
    let feld2: Feld = getFeld(felder, row2, col2)
    let feld3: Feld = getFeld(felder, row3, col3)
    let feld4: Feld = getFeld(felder, row4, col4)
    hasWon =
        compareFarbeSpieler(spieler, feld1.farbe) &&
        compareFarbeSpieler(spieler, feld2.farbe) &&
        compareFarbeSpieler(spieler, feld3.farbe) &&
        compareFarbeSpieler(spieler, feld4.farbe)
    return hasWon
}

export const checkHasWon = (felder: Feld[], spieler: Spieler): boolean => {
    let hasWon: boolean = false
    let toChange: ToChange = ToChange.Down
    for (let c=1; c<8; c++) {
        for (let r=1; r<4; r++) {
            hasWon = checkSeries(c, r, felder, spieler, toChange, hasWon)
            if (hasWon) {
                return hasWon
            }
        }
    }
    toChange = ToChange.Right
    for (let c=1; c<5; c++) {
        for (let r=1; r<7; r++) {
            hasWon = checkSeries(c, r, felder, spieler, toChange, hasWon)
            if (hasWon) {
                return hasWon
            }
        }
    }
    toChange = ToChange.DownRight
    for (let c=1; c<5; c++) {
        for (let r=1; r<4; r++) {
            hasWon = checkSeries(c, r, felder, spieler, toChange, hasWon)
            if (hasWon) {
                return hasWon
            }
        }
    }
    toChange = ToChange.UpRight
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

const getFieldsNextMove = (felder: Feld[], feld: Feld, player: Spieler): Feld[] => {
    const fieldsNextMove: Feld[] = felder.map((f: Feld) => {
        if (f.feldKey === feld.feldKey) {
            return {...f, farbe: player === Spieler.Rot ? Farbe.Rot : Farbe.Gelb}
        } else {
            return f
        }
    })
    return fieldsNextMove
}

const checkFields = (felder: Feld[], nextFields: Feld[], player: Spieler): Feld|undefined => {
    for (let feld of nextFields) {
        const fieldsNextMove: Feld[] = getFieldsNextMove(felder, feld, player)
        const playerHasWon: boolean = checkHasWon(fieldsNextMove, player)
        if (playerHasWon) {
            return feld
        }
    }
}

const checkFieldsNextMove = (felder: Feld[], feld: Feld, spieler: Spieler, gegner: Spieler, reihe: Spieler): boolean => {
    let wessenReihe: Spieler = reihe === spieler ? spieler : gegner
    let fieldsNextMove: Feld[] = getFieldsNextMove(felder, feld, spieler)
    const gegnerField: Feld = felder.find((f: Feld) => f.row === feld.row - 1 && f.col === feld.col)!
    fieldsNextMove = getFieldsNextMove(fieldsNextMove, gegnerField, wessenReihe)
    const hasWon: boolean = checkHasWon(fieldsNextMove, wessenReihe)
    return hasWon
}

export const getComputerZug = (felder: Feld[], spieler: Spieler): Feld => {
    let field: Feld, gegner: Spieler
    spieler === Spieler.Rot ? gegner = Spieler.Gelb : gegner = Spieler.Rot
    let nextFields: Feld[] = felder.filter(f => f.isNextField)

    // finds winning move
    field = checkFields(felder, nextFields, spieler)!
    if (field) {
        return field
    }

    // averts loss
    field = checkFields(felder, nextFields, gegner)!
    if (field) {
        return field
    }
    // checks for moves that would lead to immediate loss
    let fieldsNextMove: Feld[] = nextFields.filter((f: Feld) =>
        f.row === 1 || !checkFieldsNextMove(felder, f, spieler, gegner, gegner))
    if (fieldsNextMove.length > 0) {
        nextFields = fieldsNextMove
    }

    // averts destroying one's own opportunities
    fieldsNextMove = nextFields.filter((f: Feld) =>
        f.row === 1 || !checkFieldsNextMove(felder, f, spieler, gegner, spieler))
    if (fieldsNextMove.length > 0) {
        nextFields = fieldsNextMove
    }

    // averts ground row loss
    const threatGroundRow: boolean = felder.filter((f: Feld) => f.row === 6 && compareFarbeSpieler(gegner, f.farbe)).length === 2
        && felder.filter(f => f.row === 6 && compareFarbeSpieler(spieler, f.farbe)).length === 0
    if (threatGroundRow) {
        nextFields = nextFields.filter(f => f.row === 6 && f.col > 1 && f.col < 7)
    }

    // prefers middle
    const middleIsUsable: Feld = nextFields.find(f => f.col === 4 && f.row !== 1)!
    if (middleIsUsable) {
        field = nextFields.find(f => f.col === 4)!
        return field
    }

    // selects randomly
    let indexField: number = Math.floor(Math.random() * nextFields.length)
    field = nextFields[indexField]
    return field
}
