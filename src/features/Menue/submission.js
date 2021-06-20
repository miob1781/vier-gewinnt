import {useSelector, useDispatch} from 'react-redux'
import {setStatus} from '../Spiel/spielSlice.js'

export const Submission = () => {
    const dispatch = useDispatch()
    const isDisabled = useSelector(state => state.menue.isDisabled)

    const handleSubmissionInput = () => {
        dispatch(setStatus('laufend'))
    }

    return (
        <button
            type='button'
            id='los'
            onClick={handleSubmissionInput}
            disabled={isDisabled}
        >Los!</button>
    )
}