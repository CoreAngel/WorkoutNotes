import {
    ADD_EXERCISE,
    DELETE_EXERCISE,
    ExerciseAction,
    ExerciseState
} from './types';

const initialState: ExerciseState = {
    exercises: []
};

const exerciseReducer = (state = initialState, action: ExerciseAction) => {
    switch (action.type) {
        case ADD_EXERCISE:
            return {
                ...state,
                exercises: [...state.exercises, action.exercise]
            };
        case DELETE_EXERCISE:
            return {
                ...state,
                exercises: [
                    ...state.exercises.filter(ex => ex !== action.exercise)
                ]
            };
        default:
            return state;
    }
};

export default exerciseReducer;
