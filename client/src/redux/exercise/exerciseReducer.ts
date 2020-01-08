import {
    ADD_EXERCISE,
    AddExerciseAction,
    DELETE_EXERCISE,
    DeleteExerciseAction,
    ExerciseAction,
    ExerciseStore,
    SET_INDEX,
    SetIndexAction,
    TimeUnit,
    WeightUnit
} from './types';

const initialState: ExerciseStore = {
    exercises: [
        {
            id: 0,
            name: 'Bench press',
            desc: 'description',
            weight: {
                checked: true,
                unit: WeightUnit.KG,
                body: false
            },
            time: {
                checked: false,
                unit: TimeUnit.MIN
            }
        },
        {
            id: 1,
            name: 'Squad',
            desc: 'description',
            weight: {
                checked: true,
                unit: WeightUnit.KG,
                body: false
            },
            time: {
                checked: false,
                unit: TimeUnit.MIN
            }
        },
        {
            id: 2,
            name: 'Dead lift',
            desc: 'description',
            weight: {
                checked: true,
                unit: WeightUnit.KG,
                body: false
            },
            time: {
                checked: false,
                unit: TimeUnit.MIN
            }
        }
    ],
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
                exercises: [...state.exercises.filter(ex => ex.id !== deleteAction.exercise.id)]
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
