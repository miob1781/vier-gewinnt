import {ChangeEventHandler} from 'react'
import {Spielmodus as SM} from '../../app/types'

export const Spielmodus = ({onChange}: {onChange: ChangeEventHandler}) => {
    return (
        <form data-testid='spielmodus'>
            <p>Möchtest du alleine oder zu zweit spielen?</p>
            <input
                type='radio'
                id='allein'
                value={SM.Allein}
                name='spielmodus'
                onChange={onChange}
                data-testid='allein'
                defaultChecked
            />
            <label
                htmlFor='allein'
                title='Du spielst allein gegen den Computer'
            >Allein</label>
            <br />
            <input
                type='radio'
                id='zuZweit'
                value={SM.ZuZweit}
                name='spielmodus'
                onChange={onChange}
                data-testid='zuZweit'
            />
            <label
                htmlFor='zuZweit'
                title='Du spielst am selben Computer gegen einen anderen Spieler'
            >Zu zweit</label>
            <br />
        </form>
    )
}
