import {
    ADD_EXERCISE,
    AddExerciseAction,
    DELETE_EXERCISE,
    DeleteExerciseAction,
    ExerciseAction,
    ExerciseStore
} from './types';

const initialState: ExerciseStore = {
    exercises: [
        {
            id: 0,
            name: 'Bench press',
            desc: 'description',
            addBody: false,
            index: 0,
            workouts: []
        },
        {
            id: 1,
            name: 'Squad',
            desc: 'description',
            addBody: false,
            index: 0,
            workouts: []
        },
        {
            id: 2,
            name: 'Dead lift',
            desc: 'description',
            addBody: false,
            index: 0,
            workouts: []
        }
    ],
    index: 3
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
                exercises: [...state.exercises.filter(ex => ex.id !== deleteAction.exercise.id)]
            };
        }
        default:
            return state;
    }
};

export default exerciseReducer;
