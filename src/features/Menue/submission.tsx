import {useAppSelector, useAppDispatch} from '../../app/hooks'
import {Spieler, SpielStatus} from '../../app/types'
import {
    resetFelder,
    resetSpieler,
    resetComputerZieht,
    setStatus,
    setZug
} from '../Spiel/spielSlice'

export const Submission = () => {
    const dispatch = useAppDispatch()
    const isDisabled: boolean = useAppSelector(state => state.menue.isDisabled)
    const computerSpielt: Spieler = useAppSelector(state => state.menue.computerSpielt)

    const handleSubmissionInput = () => {
        dispatch(resetFelder())
        dispatch(resetSpieler())
        dispatch(resetComputerZieht(computerSpielt))
        dispatch(setStatus(SpielStatus.Laufend))
        dispatch(setZug('reset'))
    }

    return (
        <button
            type='button'
            id='los'
            onClick={handleSubmissionInput}
            disabled={isDisabled}
            title='Startet neues Spiel'
        >Los!</button>
    )
}
