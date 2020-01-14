import {
    ADD_EXERCISE,
    ADD_WORKOUT_EXERCISE,
    MULTI_ADD_WORKOUT_EXERCISE,
    AddExerciseAction,
    AddWorkoutExerciseAction,
    MultiAddWorkoutExerciseAction,
    DELETE_EXERCISE,
    DELETE_WORKOUT_EXERCISE,
    DeleteExerciseAction,
    DeleteWorkoutExerciseAction,
    Exercise,
    MODIFY_WORKOUT_EXERCISE,
    ModifyWorkoutExerciseAction,
    WorkoutExercisePayload
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

export const addWorkoutExerciseAction = (
    payload: WorkoutExercisePayload
): AddWorkoutExerciseAction => ({
    type: ADD_WORKOUT_EXERCISE,
    payload
});

export const multiAddWorkoutExerciseAction = (
    payload: WorkoutExercisePayload[]
): MultiAddWorkoutExerciseAction => ({
    type: MULTI_ADD_WORKOUT_EXERCISE,
    payload
});

export const deleteWorkoutExerciseAction = (
    payload: WorkoutExercisePayload
): DeleteWorkoutExerciseAction => ({
    type: DELETE_WORKOUT_EXERCISE,
    payload
});

export const modifyWorkoutExerciseAction = (
    payload: WorkoutExercisePayload
): ModifyWorkoutExerciseAction => ({
    type: MODIFY_WORKOUT_EXERCISE,
    payload
});
