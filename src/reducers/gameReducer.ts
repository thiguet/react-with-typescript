export interface State {
    isGameOver: boolean;
}

export enum ActionTypes {
    GAME_STATUS = 'GAME_STATUS',
}

export interface Action extends State {
    type: ActionTypes;
}

export const initialGameState: State = { isGameOver: false };

export const gameReducer = (state: State = initialGameState, { type, isGameOver }: Action) => {
    switch (type) {
        case ActionTypes.GAME_STATUS:
            return { ...state, isGameOver };
        default:
            return state;
    }
};
