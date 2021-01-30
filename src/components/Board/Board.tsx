import { useContext, useEffect, useState } from 'react';
import './Board.css';
import { Status, Direction, INITIAL_POINTS, Coordinates } from '../../consts';
import Row from '../Row/Row';
import Column from '../Column/Column';
import Square from '../Square/Square';

import { generateNewGame, generateRandomFoodPos, isGameOver } from '../../services/Game';
import { useArrowKeys } from '../../hooks/useArrowKeys';
import { useInterval } from '../../hooks/useInterval';
import { ActionTypes } from '../../reducers/gameReducer';
import { AppContext } from '../Game/Game';

const { snake, food } = generateNewGame();

const getNewDirection = ([x, y]: Coordinates, direction: Direction): Coordinates => {
    switch (direction) {
        case Direction.DOWN:
            y++;
            break;
        case Direction.UP:
            y--;
            break;
        case Direction.RIGHT:
            x++;
            break;
        case Direction.LEFT:
            x--;
            break;
    }

    return [x, y];
};

const Board = () => {
    const { state, dispatch } = useContext(AppContext);

    const [snakePos, setSnakePos] = useState(snake);
    const [foodPos, setFoodPos] = useState(food);
    const [snakeDirection, setSnakeDirection] = useState(Direction.UP);

    const [points, setPoints] = useState(INITIAL_POINTS);
    const [removed, setRemoved] = useState<Coordinates>();

    useInterval(() => {
        setSnakePos(snakePos => {
            const aux = snakePos.slice(0);
            let [x, y] = getNewDirection(aux[0], snakeDirection);
            setRemoved(aux.pop()!);
            aux.unshift([x, y]);
            return aux;
        });
    }, 100);

    const direction = useArrowKeys();

    useEffect(() => {
        setSnakeDirection(direction);
    }, [direction]);

    useEffect(() => {
        const hasEaten = JSON.stringify(snakePos[0]) === JSON.stringify(foodPos);

        if (hasEaten) {
            setFoodPos(generateRandomFoodPos());
            setPoints(points + 1);
            setSnakePos([...snakePos.slice(0), getNewDirection(snakePos[0], snakeDirection)]);
        }
    }, [foodPos, points, snakePos, snakeDirection]);

    // Update Board
    useEffect(() => {
        if (isGameOver(snakePos)) {
            return dispatch({
                type: ActionTypes.GAME_STATUS,
                isGameOver: true,
            });
        }

        const aux = state.gameMatrix!.slice(0);

        snakePos.forEach(([x, y]: Coordinates) => {
            aux[y][x] = Status.SNAKE;
        });

        if (removed) {
            aux[removed[1]][removed[0]] = Status.EMPTY;
            setRemoved(undefined);
        }
        aux[foodPos[1]][foodPos[0]] = Status.FOOD;

        dispatch({
            type: ActionTypes.GAME_BOARD,
            gameMatrix: aux,
        });
    }, [snakePos, foodPos, removed]);

    return (
        <div className="Board">
            <h1>Points: {points}</h1>{' '}
            {state.gameMatrix.map((_, i) => (
                <Row key={i}>
                    {state.gameMatrix[i].map((_, j) => (
                        <Column key={j}>
                            <Square status={state.gameMatrix[i][j]} />
                        </Column>
                    ))}
                </Row>
            ))}
        </div>
    );
};
export default Board;
