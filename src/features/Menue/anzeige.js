import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {changeText} from './menueSlice.js'

export const Anzeige = () => {
    const dispatch = useDispatch()
    const status = useSelector(state => state.spiel.status)
    const text = useSelector(state => state.menue.text)

    useEffect(() => {
        let newText
        if (status === 'rotWon') {
            newText = 'Rot hat gewonnen!'
        } else if (status === 'gelbWon') {
            newText = 'Gelb hat gewonnen!'
        } else if (status === 'draw') {
            newText = 'Unentschieden!'
        }
        dispatch(changeText(newText))
    }, [status, dispatch])

    return <p className='anzeige'>{text}</p>
}
