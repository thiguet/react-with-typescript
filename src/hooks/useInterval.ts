import { useEffect, useRef } from 'react';

export const useInterval = (callback: any, delay: number) => {
    const savedCallback = useRef<Function>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current!();
        };
        if (delay) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
