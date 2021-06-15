export const Feld = (props) => {
    const className = 'feld' + ' row' + props.row + ' col' + props.col
    const gridArea = `${props.row} / ${props.col} / ${props.row} / ${props.col}`
    const style = {gridArea: gridArea}

    const handleMouseOver = ({target}) => {
        target.style.cursor = 'pointer'
        target.style.backgroundColor = 'red'
    }

    const handleMouseOut = ({target}) => {
        target.style.backgroundColor = 'white'
    }

    const handleClick = () => {

    }

    return (
        <div
            key={props.id}
            className={className}
            style={style}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
        ></div>
    )
}