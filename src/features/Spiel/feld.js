import { configureStore } from "@reduxjs/toolkit"
import { useSelector, useDispatch } from "react-redux"
import {insertStein, selectSpieler} from './spielSlice'
import {store} from '../../app/store'

export const Feld = (props) => {
    const dispatch = useDispatch()
    const className = 'feld'
    const gridArea = `${props.row} / ${props.col} / ${props.row} / ${props.col}`
    const spieler = useSelector(selectSpieler)
    const feldKey = props.feldKey
    const feld = useSelector(state => state.spiel.felder.filter(
        f => f.feldKey === feldKey
    )[0])
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

    const displayColorMouseOver = () => {
        let color
        if (spieler === 'rot' && isNextField) {
            color = 'red'
        } else if (spieler === 'rot' && !isNextField) {
            color = 'darkred'
        } else if (spieler === 'gelb' && isNextField) {
            color = 'yellow'
        } else if (spieler === 'gelb' && !isNextField) {
            color = 'darkyellow'
        }
        return color
    }

    const handleMouseOver = ({target}) => {
        if (farbe === 'leer') {
            target.style.backgroundColor = displayColorMouseOver()
            if (isNextField) {
                target.style.cursor = 'pointer'
                target.style.border = 'orange 2px solid'
            }
        }
    }

    const handleMouseOut = ({target}) => {
        if (farbe === 'leer') {
            target.style.backgroundColor = 'white'
            target.style.border = 'none'
        }
    }

    const handleClick = ({target}) => {
        dispatch(insertStein(feld))
    }

    return (
        <div
            key={feldKey}
            className={className}
            style={style}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
        ></div>
    )
}