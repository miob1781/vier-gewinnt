import './Menue.css';
import {Spielmodus} from './spielmodus';
import {Farbe} from './farbe';
import {Submission} from './submission';
import {Anzeige} from './anzeige';

export const Menue = () => {
    return (
        <div className='menue'>
            <Spielmodus />
            <Farbe />
            <Submission />
            <Anzeige />
        </div>
    );
};
