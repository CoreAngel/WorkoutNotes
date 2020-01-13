import {
    ADD_WORKOUT,
    AddWorkoutAction,
    DELETE_WORKOUT,
    DeleteWorkoutAction,
    MODIFY_WORKOUT,
    ModifyWorkoutAction,
    Workout
} from './types';

export const addWorkout = (workout: Workout): AddWorkoutAction => ({
    type: ADD_WORKOUT,
    workout
});

export const deleteWorkout = (workout: Workout): DeleteWorkoutAction => ({
    type: DELETE_WORKOUT,
    workout
});

export const modifyWorkout = (workout: Workout): ModifyWorkoutAction => ({
    type: MODIFY_WORKOUT,
    workout
});
