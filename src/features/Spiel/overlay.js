import {useDispatch} from 'react-redux'

export const Overlay = (props) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        const mySelector = `.row${props.row}.col${props.col}`
        const feld = document.querySelector(mySelector)
        feld.style.backgroundColor = 'red'
    }

    return (
        <div 
            className = 'overlay'
            onClick={handleClick}
        ></div>
    )
}