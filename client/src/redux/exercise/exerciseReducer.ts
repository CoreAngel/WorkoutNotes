import {
    ADD_EXERCISE,
    AddExerciseAction,
    DELETE_EXERCISE,
    DeleteExerciseAction,
    ExerciseAction,
    ExerciseState,
    SET_INDEX,
    SetIndexAction
} from './types';

const initialState: ExerciseState = {
    exercises: [],
    index: 0
};

const exerciseReducer = (state = initialState, action: ExerciseAction) => {
    switch (action.type) {
        case ADD_EXERCISE: {
            const addAction = action as AddExerciseAction;
            addAction.exercise.id = state.index;

            return {
                ...state,
                exercises: [...state.exercises, addAction.exercise],
                index: state.index + 1
            };
        }
        case DELETE_EXERCISE: {
            const deleteAction = action as DeleteExerciseAction;
            return {
                ...state,
                exercises: [
                    ...state.exercises.filter(
                        ex => ex.id !== deleteAction.exercise.id
                    )
                ]
            };
        }
        case SET_INDEX: {
            const setIndexAction = action as SetIndexAction;
            return {
                ...state,
                index: setIndexAction.index
            };
        }
        default:
            return state;
    }
};

export default exerciseReducer;
