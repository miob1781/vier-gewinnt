/** used to select the playing mode */
export enum Spielmodus {
    /** play against the computer */
    Allein = 'ALLEIN',
    /** play against another person at the same computer */
    ZuZweit = 'ZUZWEIT'
}

/** color of the player */
export enum Spieler {
    /** player is Red */
    Rot = 'ROT',
    /** player is Yellow */
    Gelb = 'GELB',
    /** no player selected */
    Keiner = 'KEINER'
}

/** color of the field */
export enum Farbe {
    /** field is empty */
    Leer = 'LEER',
    /** field is red */
    Rot = 'ROT',
    /** field is yellow */
    Gelb = 'GELB'
}

/** state of the game */
export enum SpielStatus {
    /** before the game */
    VorSpiel = 'VORSPIEL',
    /** during the game */
    Laufend = 'LAUFEND',
    /** Red won */
    RotWon = 'ROTWON',
    /** Yellow won */
    GelbWon = 'GELBWON',
    /** draw */
    Draw = 'DRAW'
}

/** used during the game for the state of moves */
export enum ZugStatus {
    /** the player can move */
    Bereit = 'BEREIT',
    /** a move is being processed */
    Gezogen = 'GEZOGEN'
}

/** direction in which a series is built */
export enum ToChange {
    /** top-down */
    Down = 'DOWN',
    /** left-right */
    Right = 'RIGHT',
    /** down-right */
    DownRight = 'DOWNRIGHT',
    /** up-right */
    UpRight = 'UPRIGHT'
}

/** state of the Menue slice */
export interface MenueState {
    /** playing mode */
    spielmodus: Spielmodus,
    /** color of the player */
    farbe: Spieler,
    /** color played by the computer */
    computerSpielt: Spieler
}

/** field */
export interface Feld {
    /** field id */
    feldKey: string,
    /** row from top */
    row: number,
    /** column from left */
    col: number,
    /** field color */
    farbe: Farbe,
    /** potential next move */
    isNextField: boolean
}

/** state of the Spiel slice */
export interface SpielState {
    /** array of all fields */
    felder: Feld[],
    /** player on */
    spieler: Spieler,
    /** state of the game */
    status: SpielStatus,
    /** move number */
    zug: number,
    /** state of move */
    zugStatus: ZugStatus,
    /** computer on? */
    computerZieht: boolean
}
