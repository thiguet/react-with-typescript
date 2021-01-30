import { useCallback, useContext } from 'react';
import { getNewGame } from 'services/Game';
import { ActionTypes } from '../../reducers/gameReducer';
import { AppContext } from '../Game/Game';
import './GameOver.css';

const GameOver = () => {
    const { dispatch } = useContext(AppContext);

    const restartGame = useCallback(() => {
        dispatch({
            type: ActionTypes.GAME_BOARD,
            gameMatrix: getNewGame(),
        });
        dispatch({
            type: ActionTypes.GAME_STATUS,
            isGameOver: false,
        });
    }, [dispatch]);

    return (
        <div>
            <h1 className="heading">Game Over</h1>
            <button className="btn" onClick={restartGame}>
                Restart
            </button>
        </div>
    );
};

export default GameOver;
