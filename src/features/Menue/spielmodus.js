import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setSpielmodus, setIsDisabled, setComputerSpielt} from './menueSlice.js'

export const Spielmodus = () => {
    const dispatch = useDispatch()
    const spielmodus = useSelector(state => state.menue.spielmodus)

    const handleSpielmodusInput = () => {
        const spielmod = document.querySelector('input[name="spielmodus"]:checked').value;
        dispatch(setSpielmodus(spielmod))
    }

    useEffect(() => {
        if (spielmodus === 'allein') {
            dispatch(setIsDisabled(true))
        }
        else if (spielmodus === 'zuZweit') {
            dispatch(setIsDisabled(false))
            dispatch(setComputerSpielt('spieltNicht'))
        }
    }, [spielmodus])

    return (
        <div>
            <p>Möchtest du alleine oder zu zweit spielen?</p>
            <input
                type='radio'
                id='allein'
                value='allein'
                name='spielmodus'
                onChange={handleSpielmodusInput}
            />
            <label
                for='allein'
                title='Du spielst allein gegen den Computer'
            >Allein</label>
            <br />
            <input
                type='radio'
                id='zuZweit'
                value='zuZweit'
                name='spielmodus'
                onChange={handleSpielmodusInput}
            />
            <label
                for='zuZweit'
                title='Du spielst am selben Computer gegen einen anderen Spieler'
            >Zu zweit</label>
            <br />
        </div>
    )
}