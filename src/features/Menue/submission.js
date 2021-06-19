import {useDispatch} from 'react-redux'
import {setStatus} from './spielSlice.js'

export const Submission = () => {
    const dispatch = useDispatch()

    const handleSubmissionInput = (e) => {
        dispatch(setStatus('laufend'))
    }

    return (
        <button
            type='button'
            id='los'
            onChange={handleSubmissionInput}
            disabled
        >Los!</button>
    )
}