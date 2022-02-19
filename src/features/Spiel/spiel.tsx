import './spiel.css';
import {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../app/hooks'
import {Spieler, SpielStatus, ZugStatus, Feld as F, Farbe} from '../../app/types'
import {Feld} from './feld'
import {
    changeFarbe,
    changeIsNextField,
    changeToNextField,
    toggleSpieler,
    setZugStatus,
    setStatus,
    setZug,
    toggleComputerZieht
} from './spielSlice'
import {checkHasWon, getComputerZug} from './spielFunctions'

export const Spiel = () => {
    const dispatch = useAppDispatch()
    const felder: F[] = useAppSelector(state => state.spiel.felder)
    const generateFelder = (): JSX.Element[] => {
        let felderArray: JSX.Element[] = []
        for (let feld of felder) {
            const {row, col, feldKey} = feld
            const fieldComponent: JSX.Element = <Feld key={feldKey} feldKey={feldKey} row={row} col={col}/>
            felderArray.push(fieldComponent)
        }
        return felderArray
    }
    const newFields: JSX.Element[] = generateFelder()
    const status: SpielStatus = useAppSelector(state => state.spiel.status)
    const zugStatus: ZugStatus = useAppSelector(state => state.spiel.zugStatus)
    const spieler: Spieler = useAppSelector(state => state.spiel.spieler)
    const zug: number = useAppSelector(state => state.spiel.zug)
    const computerSpielt: Spieler = useAppSelector(state => state.menue.computerSpielt)
    const computerZieht: boolean = useAppSelector(state => state.spiel.computerZieht)

    useEffect(() => {
        if (status === SpielStatus.Laufend && zugStatus === ZugStatus.Gezogen) {
            dispatch(setZugStatus(ZugStatus.Bereit))
            const resultCheckHasWon: boolean = checkHasWon(felder, spieler)
            if (resultCheckHasWon) {
                let winnerStatus: SpielStatus = spieler === Spieler.Rot
                ? SpielStatus.RotWon
                : SpielStatus.GelbWon
                dispatch(setStatus(winnerStatus))
            } else if (zug === 41) {
                dispatch(setStatus(SpielStatus.Draw))
            } else {
                dispatch(setZug('add'))
                dispatch(toggleSpieler())
                if (computerSpielt !== Spieler.Keiner) {
                    dispatch(toggleComputerZieht())
                }
            }
        }
    }, [computerSpielt, dispatch, felder, spieler, status, zug, zugStatus])

    useEffect(() => {
        if (status === SpielStatus.Laufend && zugStatus === ZugStatus.Bereit && computerZieht) {
            const field: F = getComputerZug(felder, spieler)
            const feldKey: string = field.feldKey
            const row: number = field.row
            const col: number = field.col
            dispatch(changeFarbe({
                feldKey: feldKey,
                farbe: spieler === Spieler.Rot ? Farbe.Rot : Farbe.Gelb
            }))
            dispatch(changeIsNextField(feldKey))
            if (row > 1) {
                const nextFieldFeldKey: string = felder.filter(
                    (f: F) => f.row === row - 1 && f.col === col
                )[0].feldKey
                dispatch(changeToNextField(nextFieldFeldKey))
            }
            dispatch(setZugStatus(ZugStatus.Gezogen))
        }
    }, [computerZieht, dispatch, felder, spieler, status, zug, zugStatus])

    return (
        <div className='spiel' data-testid='spiel'>
            {newFields}
        </div>
    )
}
