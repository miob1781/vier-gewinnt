import {useSelector, useDispatch} from 'react-redux'
import {resetFelder, resetSpieler, setStatus, setZug, toggleNewGame} from '../Spiel/spielSlice.js'

export const Submission = () => {
    const dispatch = useDispatch()
    const isDisabled = useSelector(state => state.menue.isDisabled)
    const newGame = useSelector(state => state.spiel.newGame)

    const handleSubmissionInput = () => {
        if (!newGame) {
            dispatch(toggleNewGame())
            dispatch(resetFelder())
            dispatch(resetSpieler())
            dispatch(setStatus('laufend'))
            dispatch(setZug('reset'))
        }
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