import React, { useReducer } from 'react';
import { getNewGame } from 'services/Game';
import { Action, gameReducer, initialGameState } from '../../reducers/gameReducer';
import Board from '../Board/Board';
import GameOver from '../GameOver/GameOver';

export const AppContext = React.createContext<{
    state: typeof initialGameState;
    dispatch: (action: Action) => void;
}>({
    state: initialGameState,
    dispatch: () => {},
});
const renderGame = (isGameOver: boolean) => (isGameOver ? <GameOver /> : <Board />);

const Game = () => {
    const [state, dispatch] = useReducer(gameReducer, {
        isGameOver: false,
        gameMatrix: getNewGame(),
    });
    return <AppContext.Provider value={{ state, dispatch }}>{renderGame(state.isGameOver!)}</AppContext.Provider>;
};

export default Game;
