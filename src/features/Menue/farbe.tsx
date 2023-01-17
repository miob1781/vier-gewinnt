import {Spieler} from '../../app/types'

export const Farbe = ({display}: {display: string}) => {
    return (
        <form className='farbe' style={{display}} data-testid='farbe'>
            <p>Wen möchtest du spielen?</p>
            <input
                type='radio'
                id='rot'
                value={Spieler.Rot}
                name='farbe'
                data-testid='rot'
                defaultChecked
            />
            <label
                htmlFor='rot'
                title='Du spielst Rot, Rot beginnt'
            >Rot</label>
            <br />
            <input
                type='radio'
                id='gelb'
                value={Spieler.Gelb}
                name='farbe'
                data-testid='gelb'
            />
            <label
                htmlFor='gelb'
                title='Du spielst Gelb, Rot beginnt'
            >Gelb</label>
            <br />
        </form>
    )
}
