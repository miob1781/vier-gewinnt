import {useState} from 'react'
import {useAppSelector} from '../../app/hooks'
import {SpielStatus} from '../../app/types'

export const Anzeige = () => {
    const newStatus: SpielStatus = useAppSelector(state => state.spiel.status)

    const [text, setText] = useState("")
    const [status, setStatus] = useState(newStatus)

    if (status !== newStatus) {
        setStatus(newStatus)

        if (newStatus === SpielStatus.RotWon) {
            setText('Rot hat gewonnen!')
        } else if (newStatus === SpielStatus.GelbWon) {
            setText('Gelb hat gewonnen!')
        } else if (newStatus === SpielStatus.Draw) {
            setText('Unentschieden!')
        } else {
            setText('')
        }
    }

    console.log(text);

    return <p className='anzeige'>{text}</p>
}
