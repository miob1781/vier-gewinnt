import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {SpielStatus} from '../../app/types'
import {changeText} from './menueSlice'

export const Anzeige = () => {
    const dispatch = useAppDispatch()
    const status: SpielStatus = useAppSelector(state => state.spiel.status)
    const text: string = useAppSelector(state => state.menue.text)

    useEffect(() => {
        let newText: string
        if (status === SpielStatus.RotWon) {
            newText = 'Rot hat gewonnen!'
        } else if (status === SpielStatus.GelbWon) {
            newText = 'Gelb hat gewonnen!'
        } else if (status === SpielStatus.Draw) {
            newText = 'Unentschieden!'
        } else {
            newText = ''
        }
        dispatch(changeText(newText))
    }, [status, dispatch])

    return <p className='anzeige'>{text}</p>
}
