import { Coordinates, GameProps, GRID_SIZE, INITIAL_POINTS, Snake, GameMatrix, Status } from 'consts';

export const getNewGame = () =>
    Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill(Status.EMPTY)) as GameMatrix;

export const generateRandomFoodPos = (): Coordinates => {
    const randomX = getRandomInteger(0, GRID_SIZE);
    const randomY = getRandomInteger(0, GRID_SIZE);

    return [randomX, randomY];
};

const generateRandomSnakePos = (): Snake => {
    const result: Snake = [];

    if (INITIAL_POINTS > GRID_SIZE || INITIAL_POINTS > GRID_SIZE) {
        throw new Error('Não é possível desenhar a cobrinha no espaço fornecido!');
    }

    const randomX = getRandomInteger(INITIAL_POINTS * 2, GRID_SIZE - INITIAL_POINTS * 2);
    const randomY = getRandomInteger(INITIAL_POINTS * 2, GRID_SIZE - INITIAL_POINTS * 2);

    const head: Coordinates = [randomX, randomY];

    result.push(head);

    for (let i = 1; i <= INITIAL_POINTS; i++) {
        result.push([randomX, randomY + i]);
    }

    return result;
};

const getRandomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

export const generateNewGame = (): GameProps => ({
    food: generateRandomFoodPos(),
    snake: generateRandomSnakePos(),
    game: getNewGame(),
});

const isInBoundaries = (coordinate: number) => coordinate >= 0 && coordinate < GRID_SIZE;

export const isGameOver = (snake: Snake) =>
    validateGameBoundaries(snake[0]) || snake.slice(1).find(pos => JSON.stringify(snake[0]) === JSON.stringify(pos));

export const validateGameBoundaries = ([x, y]: Coordinates) => !(isInBoundaries(x) && isInBoundaries(y));
