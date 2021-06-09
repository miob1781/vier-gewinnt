import './menue.css';
import { Spielmodus } from './spielmodus.js';
import { Farbe } from './farbe.js';
import { Submission } from './submission.js';
import { Anzeige } from '../Anzeige/anzeige.js';

export const Menue = () => {
    return (
        <div>
            <form>
                <Spielmodus />
                <Farbe />
                <Submission />
            </form>
        </div>
    );
};