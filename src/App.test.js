import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './App';
import {Spielmodus, Farbe} from './app/types';

test('renders app and starts game properly, player plays red against the computer', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    )

    expect(screen.getByText('Vier gewinnt!')).toBeInTheDocument()
    expect(screen.getByText(/allein/)).toBeInTheDocument()
    expect(screen.getByText(/Gelb/)).not.toBeVisible()
    expect(screen.getByText('Los!')).toBeDisabled()
    expect(screen.getByTestId('spiel')).toBeInTheDocument()

    userEvent.click(screen.getByTestId('allein'))

    expect(screen.getByTestId('spielmodus')).toHaveFormValues({spielmodus: Spielmodus.Allein})
    expect(screen.getByTestId('farbe')).toHaveFormValues({farbe: Farbe.Rot})
    expect(screen.getByText(/Gelb/)).toBeVisible()
    expect(screen.getByText('Los!')).toBeEnabled()

    userEvent.click(screen.getByText('Los!'))
    userEvent.click(screen.getByTestId('feld39'))

    expect(screen.getByTestId('feld39')).toHaveStyle(`background-color: red;`)

    // The computer always selects feld32 if the first move of the player has been feld39.
    expect(screen.getByTestId('feld32')).toHaveStyle(`background-color: yellow;`)
})

test('renders app and starts game properly, player plays yellow against the computer', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    )

    userEvent.click(screen.getByTestId('allein'))
    userEvent.click(screen.getByTestId('gelb'))
    userEvent.click(screen.getByText(/Gelb/))

    expect(screen.getByTestId('farbe')).toHaveFormValues({farbe: Farbe.Gelb})
    expect(screen.getByText('Los!')).toBeEnabled()

    userEvent.click(screen.getByText('Los!'))

    // The computer always selects feld39 as its first move when it starts the game.
    expect(screen.getByTestId('feld39')).toHaveStyle(`background-color: red;`)
})

test('renders app and starts game properly, player against player; the winner is found, then game restarts', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    )

    userEvent.click(screen.getByTestId('zuZweit'))

    expect(screen.getByText(/Gelb/)).not.toBeVisible()
    expect(screen.getByText('Los!')).toBeEnabled()

    userEvent.click(screen.getByText('Los!'))
    userEvent.click(screen.getByTestId('feld39'))
    userEvent.click(screen.getByTestId('feld38'))
    userEvent.click(screen.getByTestId('feld40'))
    userEvent.click(screen.getByTestId('feld37'))
    userEvent.click(screen.getByTestId('feld41'))
    userEvent.click(screen.getByTestId('feld36'))
    userEvent.click(screen.getByTestId('feld42'))

    expect(screen.getByText('Rot hat gewonnen!')).toBeInTheDocument()

    userEvent.click(screen.getByText('Los!'))

    expect(screen.getByTestId('feld39')).toHaveStyle(`background-color: white;`)
})
