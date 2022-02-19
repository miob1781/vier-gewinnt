import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {Spielmodus as SM, Spieler} from '../../app/types'
import {setSpielmodus, setIsDisabled, setComputerSpielt} from './menueSlice'

export const Spielmodus = () => {
    const dispatch = useAppDispatch()
    const spielmodus: SM = useAppSelector(state => state.menue.spielmodus)

    const handleSpielmodusInput = () => {
        // @ts-ignore
        const spielmod: SM = document.querySelector('input[name="spielmodus"]:checked').value;
        dispatch(setSpielmodus(spielmod))
    }

    useEffect(() => {
        if (spielmodus === SM.Allein) {
            dispatch(setIsDisabled(true))
        }
        else if (spielmodus === SM.ZuZweit) {
            dispatch(setIsDisabled(false))
            dispatch(setComputerSpielt(Spieler.Keiner))
        }
    }, [dispatch, spielmodus])

    return (
        <form data-testid='spielmodus'>
            <p>Möchtest du alleine oder zu zweit spielen?</p>
            <input
                type='radio'
                id='allein'
                value={SM.Allein}
                name='spielmodus'
                onChange={handleSpielmodusInput}
                data-testid='allein'
            />
            <label
                htmlFor='allein'
                title='Du spielst allein gegen den Computer'
            >Allein</label>
            <br />
            <input
                type='radio'
                id='zuZweit'
                value={SM.ZuZweit}
                name='spielmodus'
                onChange={handleSpielmodusInput}
                data-testid='zuZweit'
            />
            <label
                htmlFor='zuZweit'
                title='Du spielst am selben Computer gegen einen anderen Spieler'
            >Zu zweit</label>
            <br />
        </form>
    )
}
