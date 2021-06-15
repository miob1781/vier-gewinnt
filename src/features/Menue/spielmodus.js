import {useDispatch, useSelector} from 'react-redux'
import {toggleSpielmodus} from './menueSlice.js'

export const Spielmodus = () => {
    const dispatch = useDispatch()

    const handleSpielmodusInput = () => {
        const spielmodus = document.querySelector('input[name="spielmodus"]:checked').value;
        dispatch(toggleSpielmodus(spielmodus))
    }

    return (
        <div>
            <p>Möchtest du alleine oder zu zweit spielen?</p>
            <input type='radio' id='allein' value='allein' name='spielmodus' onChange={handleSpielmodusInput}/>
            <label for='allein'>Allein</label>
            <br />
            <input type='radio' id='zuZweit' value='zuZweit' name='spielmodus' onChange={handleSpielmodusInput} />
            <label for='zuZweit'>Zu zweit</label>
            <br />
        </div>
    )
}