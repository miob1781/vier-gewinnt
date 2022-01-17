import './spiel.css';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Feld} from './feld.js'
import {
    changeFarbe,
    changeIsNextField,
    changeToNextField,
    toggleSpieler,
    setZugStatus,
    setStatus,
    setZug,
    toggleComputerZieht
} from './spielSlice.js'
import {checkHasWon, getComputerZug} from './spielFunctions.js'

export const Spiel = () => {
    const felderObject = useSelector(state => state.spiel.felder)
    const generateFelder = () => {
        let felderArray = []
        for (let item of felderObject) {
            const {row, col, feldKey} = item

            const feld = <Feld
                feldKey={feldKey}
                row={row}
                col={col}
            />
                
            felderArray.push(feld)
        }
        return felderArray
    }

    const newFields = generateFelder()
    const dispatch = useDispatch()
    const felder = useSelector(state => state.spiel.felder)
    const status = useSelector(state => state.spiel.status)
    const zugStatus = useSelector(state => state.spiel.zugStatus)
    const spieler = useSelector(state => state.spiel.spieler)
    const zug = useSelector(state => state.spiel.zug)
    const computerSpielt = useSelector(state => state.menue.computerSpielt)
    const computerZieht = useSelector(state => state.spiel.computerZieht)

    useEffect(() => {
        if (status === 'laufend' && zugStatus === 'gezogen') {
            dispatch(setZugStatus('bereit'))
            const resultCheckHasWon = checkHasWon(felder, spieler)
            if (resultCheckHasWon) {
                let winnerStatus
                spieler === 'rot' ? winnerStatus = 'rotWon' : winnerStatus = 'gelbWon'
                dispatch(setStatus(winnerStatus))
            } else if (zug === 41) {
                dispatch(setStatus('draw'))
            } else {
                dispatch(setZug('add'))
                dispatch(toggleSpieler())
                if (computerSpielt !== 'spieltNicht') {
                    dispatch(toggleComputerZieht())
                }
            }
        }
    }, [computerSpielt, dispatch, felder, spieler, status, zug, zugStatus])

    useEffect(() => {
        if (status === 'laufend' && zugStatus === 'bereit' && computerZieht) {
            const field = getComputerZug(felder, spieler)
            const feldKey = field.feldKey
            const row = field.row
            const col = field.col

            dispatch(changeFarbe({
                feldKey: feldKey,
                farbe: spieler
            }))
            dispatch(changeIsNextField(feldKey))
            if (row > 1) {
                const nextFieldFeldKey = felder.filter(
                    f => f.row === row - 1 && f.col === col
                    )[0].feldKey
                dispatch(changeToNextField(nextFieldFeldKey))
            }
            dispatch(setZugStatus('gezogen'))
        }
    }, [computerZieht, dispatch, felder, spieler, status, zug, zugStatus])

    return (
        <div className='spiel' data-testid='spiel'>
            {newFields}
        </div>
    )
}
