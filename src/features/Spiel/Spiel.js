import './spiel.css';
import {Feld} from './feld.js'
import {useSelector} from 'react-redux';

export const Spiel = () => {
    const felderObject = useSelector(state => state.spiel.felder)
    const generateFelder = () => {
        let felderArray = []
        for (let item of felderObject) {
            const row = item.row
            const col = item.col
            const feldKey = item.feldKey

            const feld = <Feld
                feldKey={feldKey}
                row={row}
                col={col} />
            felderArray.push(feld)
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