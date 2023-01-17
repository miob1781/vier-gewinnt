import {useState} from 'react'
import './Menue.css';
import {Spielmodus} from './spielmodus';
import {Farbe} from './farbe';
import {Submission} from './submission';
import {Anzeige} from './anzeige';

export const Menue = () => {
    const [display, setDisplay] = useState('block')

    const handleColorChange = () => {  
        const alleinInput = document.getElementById('allein') as HTMLInputElement
        setDisplay(alleinInput.checked ? 'block' : 'none')
    }

    return (
        <div className='menue'>
            <Spielmodus onChange={handleColorChange} />
            <Farbe display={display} />
            <Submission />
            <Anzeige />
        </div>
    );
};
