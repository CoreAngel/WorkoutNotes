import { ADD_EXERCISE, DELETE_EXERCISE, Exercise } from './types';

export const addExercise = (exercise: Exercise) => ({
    type: ADD_EXERCISE,
    exercise
});

export const deleteExercise = (exercise: Exercise) => ({
    type: DELETE_EXERCISE,
    exercise
});
