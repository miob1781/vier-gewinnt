import { useSelector } from 'react-redux'


export const Anzeige = () => {
    const spielmodus = useSelector(state => state.menue.spielmodus)
    const status = useSelector(state => state.spiel.status)

    let text


    return (
        <h4>{text}</h4>
    )
}