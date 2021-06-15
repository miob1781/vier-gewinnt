import './spiel.css';
import {Feld} from './feld.js'
import {changeFarbe} from './spielSlice.js'

export const Spiel = () => {
    const generateFelder = () => {
        let felderArray = []
        let id = 0
        let row, col

        for (let i=1; i<7; i++) {
            row = i
            for (let j=1; j<8; j++) {
                col = j
                id++
                let feld = <Feld
                    id={id}
                    row={row}
                    col={col} />
                felderArray.push(feld)
            }
        }
        return felderArray
    }

    const felder = generateFelder()

    return (
        <div className='spiel'>
            {felder}
        </div>
    )
}