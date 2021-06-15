import './menue.css';
import { Spielmodus } from './spielmodus.js';
import { Farbe } from './farbe.js';
import { Submission } from './submission.js';

export const Menue = () => {
    return (
        <div className='menue'>
            <form>
                <Spielmodus />
                <Farbe />
                <Submission />
            </form>
        </div>
    );
};