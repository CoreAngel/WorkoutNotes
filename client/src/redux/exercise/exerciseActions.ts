import { ADD_EXERCISE, DELETE_EXERCISE, Exercise, SET_INDEX } from './types';

export const addExercise = (exercise: Exercise) => ({
    type: ADD_EXERCISE,
    exercise
});

export const deleteExercise = (exercise: Exercise) => ({
    type: DELETE_EXERCISE,
    exercise
});

export const setIndex = (index: number) => ({
    type: SET_INDEX,
    index
});
