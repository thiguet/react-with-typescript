import { useState, useEffect } from 'react';

interface KeyInput {
    key: string;
}

const useKeyPress = (targetKey: string) => {
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = ({ key }: KeyInput) => {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    };

    const upHandler = ({ key }: KeyInput) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    });

    return keyPressed;
};

export { useKeyPress };
