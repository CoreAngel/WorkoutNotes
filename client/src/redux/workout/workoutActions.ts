import {
    ADD_WORKOUT,
    AddWorkoutAction,
    DELETE_WORKOUT,
    DeleteWorkoutAction,
    MODIFY_WORKOUT,
    ModifyWorkoutAction,
    SET_WORKOUT_FINISHED,
    SetWorkoutFinishedAction,
    Workout
} from './types';

export const addWorkout = (workout: Workout): AddWorkoutAction => ({
    type: ADD_WORKOUT,
    workout
});

export const setWorkoutFinished = (workoutId: number): SetWorkoutFinishedAction => ({
    type: SET_WORKOUT_FINISHED,
    workoutId
});

export const deleteWorkout = (workout: Workout): DeleteWorkoutAction => ({
    type: DELETE_WORKOUT,
    workout
});

export const modifyWorkout = (workout: Workout): ModifyWorkoutAction => ({
    type: MODIFY_WORKOUT,
    workout
});
