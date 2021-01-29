import { useContext } from 'react';
import { ActionTypes } from '../../reducers/gameReducer';
import { AppContext } from '../Game/Game';
import './GameOver.css';

const GameOver = () => {
    const ctx = useContext(AppContext);

    return (
        <div>
            <h1 className="heading">Game Over</h1>
            <button
                className="btn"
                onClick={() =>
                    ctx.dispatch({
                        type: ActionTypes.GAME_STATUS,
                        isGameOver: false,
                    })
                }
            >
                Restart
            </button>
        </div>
    );
};

export default GameOver;
