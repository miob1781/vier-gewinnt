import {useDispatch} from 'react-redux'
import {toggleIsReady} from './menueSlice.js'

export const Submission = () => {
    const dispatch = useDispatch()

    const handleSubmissionInput = (e) => {
        dispatch(toggleIsReady())
    }

    return (
        <button type='button' id='los' onChange={handleSubmissionInput} disabled>Los!</button>
    )
}