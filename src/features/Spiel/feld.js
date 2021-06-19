import { useSelector, useDispatch } from "react-redux"
import {changeFarbe, changeIsNextField, changeToNextField, toggleSpieler, selectSpieler} from './spielSlice'

export const Feld = (props) => {
    const dispatch = useDispatch()
    const className = 'feld'
    const row = props.row
    const col = props.col
    const gridArea = `${row} / ${col} / ${row} / ${col}`
    const spieler = useSelector(selectSpieler)
    const feldKey = props.feldKey
    const felder = useSelector(state => state.spiel.felder)
    const feld = felder.filter(
        f => f.feldKey === feldKey
    )[0]
    const farbe = feld.farbe
    const isNextField = feld.isNextField

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
        if (isNextField) {
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
        }
    }

    const handleClick = ({target}) => {
        if (isNextField) {
            dispatch(changeFarbe({feldKey: feldKey, farbe: spieler}))
            dispatch(changeIsNextField(feldKey))
            if (feld.row > 1) {
                const nextFieldFeldKey = felder.filter(
                    f => f.row === row - 1 && f.col === col
                )[0].feldKey
                dispatch(changeToNextField(nextFieldFeldKey))
            }
            dispatch(toggleSpieler())
            target.style.border = 'none'
        }
    }

    const handleMouseDown = ({target}) => {
        let color
        spieler === 'rot' ? color = 'darkred' : color = 'goldenrod'
        target.style.backgroundColor = color
    }

    return (
        <div
            key={feldKey}
            className={className}
            style={style}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
        ></div>
    )
}