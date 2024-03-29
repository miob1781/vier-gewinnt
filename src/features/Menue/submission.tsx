import {MouseEventHandler} from 'react'
import {useAppDispatch} from '../../app/hooks'
import {Spieler, SpielStatus} from '../../app/types'
import {
    resetFelder,
    resetSpieler,
    setComputerZieht,
    setComputerSpielt,
    setStatus,
    setZug
} from '../Spiel/spielSlice'

export const Submission = () => {
    const dispatch = useAppDispatch()
    
    const handleSubmissionInput: MouseEventHandler = () => {
        const alleinInput = document.getElementById('allein') as HTMLInputElement
        const rotInput = document.getElementById('rot') as HTMLInputElement
        let computerZieht: boolean, computerSpielt: Spieler

        if (alleinInput.checked) {
            if (rotInput.checked) {
                computerZieht = false
                computerSpielt = Spieler.Rot
            } else {
                computerZieht = true
                computerSpielt = Spieler.Gelb
            }
        } else {
            computerZieht = false
            computerSpielt = Spieler.Keiner
        }

        dispatch(setComputerZieht(computerZieht))
        dispatch(setComputerSpielt(computerSpielt))
        dispatch(resetFelder())
        dispatch(resetSpieler())
        dispatch(setStatus(SpielStatus.Laufend))
        dispatch(setZug('reset'))
    }

    return (
        <button
            type='button'
            id='los'
            onClick={handleSubmissionInput}
            title='Startet neues Spiel'
        >Los!</button>
    )
}
