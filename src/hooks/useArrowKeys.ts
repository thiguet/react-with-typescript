import { useState, useEffect } from 'react';
import { useKeyPress } from './useKeyPress';
import { Direction } from '../consts';

export const useArrowKeys = () => {
    const [snakeDirection, setSnakeDirection] = useState(Direction.UP);

    const downPress = useKeyPress('ArrowDown');
    const upPress = useKeyPress('ArrowUp');
    const leftPress = useKeyPress('ArrowLeft');
    const rightPress = useKeyPress('ArrowRight');

    useEffect(() => {
        if (downPress && snakeDirection !== Direction.UP) {
            setSnakeDirection(Direction.DOWN);
        }
    }, [downPress, snakeDirection]);
    useEffect(() => {
        if (upPress && snakeDirection !== Direction.DOWN) {
            setSnakeDirection(Direction.UP);
        }
    }, [upPress, snakeDirection]);
    useEffect(() => {
        if (leftPress && snakeDirection !== Direction.RIGHT) {
            setSnakeDirection(Direction.LEFT);
        }
    }, [leftPress, snakeDirection]);
    useEffect(() => {
        if (rightPress && snakeDirection !== Direction.LEFT) {
            setSnakeDirection(Direction.RIGHT);
        }
    }, [rightPress, snakeDirection]);

    return snakeDirection;
};
