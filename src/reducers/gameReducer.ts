export interface State {
    isGameOver: boolean;
    gameMatrix: number[][];
}

export enum ActionTypes {
    GAME_STATUS = 'GAME_STATUS',
    GAME_BOARD = 'GAME_BOARD',
}

export type Action =
    | { type: ActionTypes.GAME_BOARD; gameMatrix: State['gameMatrix'] }
    | { type: ActionTypes.GAME_STATUS; isGameOver: State['isGameOver'] };

export const initialGameState: State = { isGameOver: false, gameMatrix: [][0] };

export const gameReducer = (state: State = initialGameState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GAME_STATUS:
            const { isGameOver } = action;
            return { ...state, isGameOver };
        case ActionTypes.GAME_BOARD:
            const { gameMatrix } = action;
            return { ...state, gameMatrix };
        default:
            return state;
    }
};
