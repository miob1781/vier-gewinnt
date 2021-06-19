import './menue.css';
import { Spielmodus } from './spielmodus.js';
import { Farbe } from './farbe.js';
import { Submission } from './submission.js';
import { Anzeige } from './anzeige.js';

export const Menue = () => {
    return (
        <div className='menue'>
            <form>
                <Spielmodus />
                <Farbe />
                <Submission />
                <Anzeige />
            </form>
        </div>
    );
};