import {useSelector, useDispatch} from 'react-redux'
import {
    changeFarbe,
    changeIsNextField,
    changeToNextField,
    setZugStatus
} from './spielSlice.js'

export const Feld = (props) => {
    const dispatch = useDispatch()
    const {row, col, feldKey} = props
    const gridArea = `${row} / ${col} / ${row} / ${col}`
    const spieler = useSelector(state => state.spiel.spieler)
    const felder = useSelector(state => state.spiel.felder)
    const feld = felder.filter(f => f.feldKey === feldKey)[0]
    const farbe = feld.farbe
    const isNextField = feld.isNextField
    const status = useSelector(state => state.spiel.status)
    const computerZieht = useSelector(state => state.spiel.computerZieht)

    const findFeldFarbe = () => {
        let color
        if (farbe === 'rot') {
            color = 'red'
        } else if (farbe === 'gelb') {
            color = 'yellow'
        } else if (farbe === 'leer') {
            color = 'white'
        }
        return color
    }

    const style = {
        gridArea: gridArea,
        backgroundColor: findFeldFarbe()
    }

    const handleMouseOver = ({target}) => {
        if (isNextField && status === 'laufend' && !computerZieht) {
            let color
            spieler === 'rot' ? color = 'red' : color = 'yellow'
            target.style.backgroundColor = color
            target.style.cursor = 'pointer'
            target.style.border = 'orange 2px solid'
        }
    }

    const handleMouseOut = ({target}) => {
        if (farbe === 'leer') {
            target.style.backgroundColor = 'white'
            target.style.border = 'none'
            target.style.cursor = 'unset'
        }
    }

    const handleMouseDown = ({target}) => {
        if (isNextField && status === 'laufend' && !computerZieht) {
            let color
            spieler === 'rot' ? color = 'darkred' : color = 'goldenrod'
            target.style.backgroundColor = color
        }
    }
    
    const handleClick = ({target}) => {
        if (isNextField && status === 'laufend' && !computerZieht) {
            target.style.border = 'none'
            target.style.cursor = 'unset'
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
    }

    return (
        <div
            key={feldKey}
            className={'feld'}
            style={style}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
        ></div>
    )
}