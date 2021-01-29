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
        if (downPress) {
            setSnakeDirection(Direction.DOWN);
        }
    }, [downPress]);
    useEffect(() => {
        if (upPress) {
            setSnakeDirection(Direction.UP);
        }
    }, [upPress]);
    useEffect(() => {
        if (leftPress) {
            setSnakeDirection(Direction.LEFT);
        }
    }, [leftPress]);
    useEffect(() => {
        if (rightPress) {
            setSnakeDirection(Direction.RIGHT);
        }
    }, [rightPress]);

    return snakeDirection;
};
