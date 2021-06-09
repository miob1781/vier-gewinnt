import './anzeige.css';
import { useSelector } from 'react-redux'

export const Anzeige = () => {
    const headline = useSelector(state => state.menue.spielmodus)

    return (
        <h4>{headline}</h4>
    )
}