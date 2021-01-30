export const GRID_SIZE = 20;

export const INITIAL_POINTS = 3;

export enum Status {
    SNAKE,
    EMPTY,
    FOOD,
}

export enum Direction {
    DOWN = 'DOWN',
    UP = 'UP',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

export type Snake = Coordinates[];

export type Coordinates = [x: number, y: number];

export type GameMatrix = number[][];

export interface GameProps {
    food: Coordinates;
    snake: Snake;
    game: GameMatrix;
}
