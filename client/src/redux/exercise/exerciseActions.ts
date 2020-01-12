import {
    ADD_EXERCISE,
    AddExerciseAction,
    DELETE_EXERCISE,
    DeleteExerciseAction,
    Exercise
} from './types';

export const addExercise = (exercise: Exercise): AddExerciseAction => {
    const fullExercise: Exercise = {
        ...exercise,
        workouts: [],
        index: 0
    };
    return {
        type: ADD_EXERCISE,
        exercise: fullExercise
    };
};

export const deleteExercise = (exercise: Exercise): DeleteExerciseAction => ({
    type: DELETE_EXERCISE,
    exercise
});
