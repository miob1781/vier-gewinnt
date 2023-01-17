import {MouseEvent} from 'react'
import {useAppSelector, useAppDispatch} from '../../app/hooks'
import {Spieler, Farbe, SpielStatus, ZugStatus, Feld as F, FeldProps} from '../../app/types'
import {changeFarbe, changeIsNextField, changeToNextField, setZugStatus} from './spielSlice'

export const Feld = (props: FeldProps) => {
    const dispatch = useAppDispatch()
    const {row, col, feldKey} = props
    const gridArea: string = `${row} / ${col} / ${row} / ${col}`
    const spieler: Spieler = useAppSelector(state => state.spiel.spieler)
    const felder: F[] = useAppSelector(state => state.spiel.felder)
    const feld: F = felder.find((f: F) => f.feldKey === feldKey)!
    const {farbe, isNextField} = feld
    const status: SpielStatus = useAppSelector(state => state.spiel.status)
    const computerZieht: boolean = useAppSelector(state => state.spiel.computerZieht)

    const findFeldFarbe = (): string => {
        let color: string
        if (farbe === Farbe.Rot) {
            color = 'red'
        } else if (farbe === Farbe.Gelb) {
            color = 'yellow'
        } else { // the else condition is farbe === Farbe.Leer
            color = 'white'
        }
        return color
    }

    const style = {
        gridArea: gridArea,
        backgroundColor: findFeldFarbe()
    }

    const handleMouseOver = (e: MouseEvent) => {
        if (isNextField && status === SpielStatus.Laufend && !computerZieht) {
            let color: string = spieler === Spieler.Rot ? 'red' : 'yellow'
            const target = e.target as HTMLElement
            target.style.backgroundColor = color
            target.style.cursor = 'pointer'
            target.style.border = 'orange 2px solid'
        }
    }

    const handleMouseOut = (e: MouseEvent) => {
        if (farbe === Farbe.Leer) {
            const target = e.target as HTMLElement
            target.style.backgroundColor = 'white'
            target.style.border = 'none'
            target.style.cursor = 'unset'
        }
    }

    const handleMouseDown = (e: MouseEvent) => {
        if (isNextField && status === SpielStatus.Laufend && !computerZieht) {
            let color: string = spieler === Spieler.Rot ? 'darkred' : 'goldenrod'
            const target = e.target as HTMLElement
            target.style.backgroundColor = color
        }
    }
    
    const handleClick = (e: MouseEvent) => {
        if (isNextField && status === SpielStatus.Laufend && !computerZieht) {
            const target = e.target as HTMLElement
            target.style.border = 'none'
            target.style.cursor = 'unset'
            dispatch(changeFarbe({
                feldKey: feldKey,
                farbe: spieler === Spieler.Rot ? Farbe.Rot : Farbe.Gelb
            }))
            dispatch(changeIsNextField(feldKey))
            if (row > 1) {
                const nextFieldFeldKey: string = felder.find(
                    (f: F) => f.row === row - 1 && f.col === col
                )!.feldKey
                dispatch(changeToNextField(nextFieldFeldKey))
            }
            dispatch(setZugStatus(ZugStatus.Gezogen))
        }
    }

    return (
        <div
            className={'feld'}
            style={style}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            data-testid={feldKey}
        ></div>
    )
}
