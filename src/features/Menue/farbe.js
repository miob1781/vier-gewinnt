import {useSelector, useDispatch} from 'react-redux'
import {toggleFarbe, toggleIsDisabled, selectDisplayFarbe} from './menueSlice.js'

export const Farbe = () => {
    const dispatch = useDispatch()

    const displayFarbe = useSelector(selectDisplayFarbe)

    const handleFarbeInput = () => {
        const farbe = document.querySelector('input[name="farbe"]:checked').value;
        dispatch(toggleFarbe(farbe))
        dispatch(toggleIsDisabled())
    }

    return (
        <div className='farbe' style={displayFarbe}>
            <p>Wen möchtest du spielen?</p>
            <input
                type='radio'
                id='rot'
                value='rot'
                name='farbe'
                onChange={handleFarbeInput}
            />
            <label
                for='rot'
                title='Du spielst Rot, Rot beginnt'
            >Rot</label>
            <br />
            <input
                type='radio'
                id='gelb'
                value='gelb'
                name='farbe'
                onChange={handleFarbeInput}
            />
            <label
                for='gelb'
                title='Du spielst Gelb, Rot beginnt'
            >Gelb</label>
            <br />

        </div>
    )
}