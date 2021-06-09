import {useDispatch} from 'react-redux'
import {toggleIsReady} from './menueSlice.js'

export const Submission = () => {
    const dispatch = useDispatch()

    const handleSubmissionInput = () => {
        dispatch(toggleIsReady())
    }

    return (
        <input type='submit' value='Los!' onChange={handleSubmissionInput} disabled />
    )
}