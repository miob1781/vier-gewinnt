import {useAppSelector, useAppDispatch} from '../../app/hooks'
import {Spieler} from '../../app/types'
import {setFarbe, setIsDisabled, selectDisplayFarbe, setComputerSpielt} from './menueSlice'

export const Farbe = () => {
    const dispatch = useAppDispatch()
    const displayFarbe: {display: string} = useAppSelector(selectDisplayFarbe)

    const handleFarbeInput = () => {
        // @ts-ignore
        const farbe: Spieler = document.querySelector('input[name="farbe"]:checked').value;
        let computerFarbe: Spieler = farbe === Spieler.Rot ? Spieler.Gelb : Spieler.Rot
        dispatch(setFarbe(farbe))
        dispatch(setComputerSpielt(computerFarbe))
        dispatch(setIsDisabled(false))
    }

    return (
        <form className='farbe' style={displayFarbe} data-testid='farbe'>
            <p>Wen möchtest du spielen?</p>
            <input
                type='radio'
                id='rot'
                value={Spieler.Rot}
                name='farbe'
                onChange={handleFarbeInput}
                data-testid='rot'
                checked
            />
            <label
                htmlFor='rot'
                title='Du spielst Rot, Rot beginnt'
            >Rot</label>
            <br />
            <input
                type='radio'
                id='gelb'
                value={Spieler.Gelb}
                name='farbe'
                onChange={handleFarbeInput}
                data-testid='gelb'
            />
            <label
                htmlFor='gelb'
                title='Du spielst Gelb, Rot beginnt'
            >Gelb</label>
            <br />
        </form>
    )
}
