import {useSelector, useDispatch} from 'react-redux'
import {toggleFarbe, toggleIsReady, selectDisplayFarbe} from './menueSlice.js'

export const Farbe = () => {
    const dispatch = useDispatch()

    const displayFarbe = useSelector(selectDisplayFarbe)

    const handleFarbeInput = () => {
        const farbe = document.querySelector('input[name="farbe"]:checked').value;
        const los = document.getElementById("los");
        dispatch(toggleFarbe(farbe))
        los.disabled = false
    }

    return (
        <div className='farbe' style={displayFarbe}>
            <p>Wen möchtest du spielen?</p>
            <input type='radio' id='gelb' value='gelb' name='farbe' onChange={handleFarbeInput} />
            <label for='gelb'>Gelb</label>
            <br />
            <input type='radio' id='rot' value='rot' name='farbe' onChange={handleFarbeInput} />
            <label for='rot'>Rot</label>
            <br />
        </div>
    )
}