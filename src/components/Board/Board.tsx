import { useCallback, useContext, useEffect, useState } from 'react';
import './Board.css';
import { GRID_SIZE, Status, Direction, GameMatriz, INITIAL_POINTS, Snake, Coordinates } from '../../consts';
import Row from '../Row/Row';
import Column from '../Column/Column';
import Square from '../Square/Square';

import { generateNewGame, generateRandomFoodPos, isGameOver } from '../../services/Game';
import { useArrowKeys } from '../../hooks/useArrowKeys';
import { useInterval } from '../../hooks/useInterval';
import { ActionTypes } from '../../reducers/gameReducer';
import { AppContext } from '../Game/Game';

const { snake, food } = generateNewGame();

const Board = () => {
    const ctx = useContext(AppContext);

    const [gameMatrix, setGameMatrix] = useState(
        Array(GRID_SIZE)
            .fill(null)
            .map(() => Array(GRID_SIZE).fill(Status.EMPTY)) as GameMatriz
    );
    const [snakePos, setSnakePos] = useState(snake);
    const [foodPos, setFoodPos] = useState(food);
    const [snakeDirection, setSnakeDirection] = useState(Direction.UP);

    const [points, setPoints] = useState(INITIAL_POINTS);

    const getNewDirection = useCallback(
        ([x, y]: Coordinates): Coordinates => {
            switch (snakeDirection) {
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
        },
        [snakeDirection]
    );

    const updateSnakePos = (snake: Snake): Snake => {
        const aux = snake.slice(0);
        let [x, y] = getNewDirection(aux[0]);

        // Clean empty spaces.
        const removed = aux.pop()!;
        const matrixAux = gameMatrix.slice(0);
        matrixAux[removed[1]][removed[0]] = Status.EMPTY;
        setGameMatrix(matrixAux);

        aux.unshift([x, y]);
        return aux;
    };

    const direction = useArrowKeys();

    useEffect(() => {
        setSnakeDirection(direction);
    }, [direction, snakePos]);

    useInterval(() => {
        setSnakePos(snakePos => updateSnakePos(snakePos));
    }, 200);

    useEffect(() => {
        if (isGameOver(snakePos)) {
            return ctx.dispatch({ type: ActionTypes.GAME_STATUS, isGameOver: true });
        }
        const aux = gameMatrix.slice(0);
        snakePos.forEach(coord => {
            aux[coord[1]][coord[0]] = Status.SNAKE;
        });
        setGameMatrix(aux);
    }, [gameMatrix, snakePos, ctx]);

    useEffect(() => {
        const hasEaten = JSON.stringify(snakePos[0]) === JSON.stringify(foodPos);

        if (hasEaten) {
            setFoodPos(generateRandomFoodPos());
            setPoints(points + 1);

            const aux = snakePos.slice(0);
            aux.push(getNewDirection(snakePos[0]));
            setSnakePos(aux);
        }
    }, [foodPos, snakePos, points, getNewDirection]);

    useEffect(() => {
        const aux = gameMatrix.slice(0);
        aux[foodPos[1]][foodPos[0]] = Status.FOOD;
        setGameMatrix(aux);
    }, [foodPos, gameMatrix]);

    return (
        <div className="Board">
            <h1>Points: {points}</h1>{' '}
            {gameMatrix.map((_, i) => (
                <Row key={i}>
                    {gameMatrix[i].map((_, j) => (
                        <Column key={j}>
                            <Square status={gameMatrix[i][j]} />
                        </Column>
                    ))}
                </Row>
            ))}
        </div>
    );
};
export default Board;
