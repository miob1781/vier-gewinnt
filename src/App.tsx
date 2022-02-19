import {Menue} from './features/Menue/menue';
import {Spiel} from './features/Spiel/spiel';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Vier gewinnt!</h1>
                <p>Spiele eine Partie Vier gewinnt!</p>
            </header>
            <main> 
                <Menue />
                <Spiel />
            </main>
            <footer>
                <p>Created by Michael Oberst</p>
            </footer>
        </div>
    );
}

export default App;
