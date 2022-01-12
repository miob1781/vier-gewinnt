import {useSelector, useDispatch} from 'react-redux'
import {
    resetFelder,
    resetSpieler,
    resetComputerZieht,
    setStatus,
    setZug
} from '../Spiel/spielSlice.js'

export const Submission = () => {
    const dispatch = useDispatch()
    const isDisabled = useSelector(state => state.menue.isDisabled)
    const computerSpielt = useSelector(state => state.menue.computerSpielt)

    const handleSubmissionInput = () => {
        dispatch(resetFelder())
        dispatch(resetSpieler())
        dispatch(resetComputerZieht(computerSpielt))
        dispatch(setStatus('laufend'))
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
