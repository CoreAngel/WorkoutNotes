export type Result = {
    weight: number;
    reps: number;
};

export type Set = {
    index: number;
    id?: number;
    goal: Result | null;
    achieved: Result;
};

export type ExerciseWorkout = {
    id?: number;
    workoutId: number;
    setIndex: number;
    sets: Set[];
};

export type Exercise = {
    id?: number;
    name: string;
    desc: string;
    addBody: boolean;
    workouts: ExerciseWorkout[];
    index?: number;
};

export type WorkoutExercisePayload = {
    workout: ExerciseWorkout;
    exerciseId: number;
};

export type WorkoutExerciseSetPayload = {
    exerciseId: number;
    workoutId: number;
    set: Set;
};

export type ExerciseStore = {
    exercises: Exercise[];
    index: number;
};

const PREFIX = 'exercise';
export const ADD_EXERCISE = `${PREFIX}/ADD_EXERCISE`;
export const MODIFY_EXERCISE = `${PREFIX}/MODIFY_EXERCISE`;
export const DELETE_EXERCISE = `${PREFIX}/DELETE_EXERCISE`;
export const ADD_WORKOUT_EXERCISE = `${PREFIX}/ADD_WORKOUT_EXERCISE`;
export const MULTI_ADD_WORKOUT_EXERCISE = `${PREFIX}/MULTI_ADD_WORKOUT_EXERCISE`;
export const MODIFY_WORKOUT_EXERCISE = `${PREFIX}/MODIFY_WORKOUT_EXERCISE`;
export const DELETE_WORKOUT_EXERCISE = `${PREFIX}/DELETE_WORKOUT_EXERCISE`;
export const ADD_WORKOUT_EXERCISE_SET = `${PREFIX}/ADD_WORKOUT_EXERCISE_SET`;
export const MODIFY_WORKOUT_EXERCISE_SET = `${PREFIX}/MODIFY_WORKOUT_EXERCISE_SET`;
export const DELETE_WORKOUT_EXERCISE_SET = `${PREFIX}/DELETE_WORKOUT_EXERCISE_SET`;

export interface AddExerciseAction {
    type: typeof ADD_EXERCISE;
    exercise: Exercise;
}

export interface ModifyExerciseAction {
    type: typeof MODIFY_EXERCISE;
    exercise: Exercise;
}

export interface DeleteExerciseAction {
    type: typeof DELETE_EXERCISE;
    exercise: Exercise;
}

export interface AddWorkoutExerciseAction {
    type: typeof ADD_WORKOUT_EXERCISE;
    payload: WorkoutExercisePayload;
}

export interface MultiAddWorkoutExerciseAction {
    type: typeof MULTI_ADD_WORKOUT_EXERCISE;
    payload: WorkoutExercisePayload[];
}

export interface ModifyWorkoutExerciseAction {
    type: typeof MODIFY_WORKOUT_EXERCISE;
    payload: WorkoutExercisePayload;
}

export interface DeleteWorkoutExerciseAction {
    type: typeof DELETE_WORKOUT_EXERCISE;
    payload: WorkoutExercisePayload;
}

export interface AddWorkoutExerciseSetAction {
    type: typeof ADD_WORKOUT_EXERCISE_SET;
    payload: WorkoutExerciseSetPayload;
}

export interface ModifyWorkoutExerciseSetAction {
    type: typeof MODIFY_WORKOUT_EXERCISE_SET;
    payload: WorkoutExerciseSetPayload;
}

export interface DeleteWorkoutExerciseSetAction {
    type: typeof DELETE_WORKOUT_EXERCISE_SET;
    payload: WorkoutExerciseSetPayload;
}

export type ExerciseAction =
    | AddExerciseAction
    | MultiAddWorkoutExerciseAction
    | DeleteExerciseAction
    | AddWorkoutExerciseAction
    | ModifyWorkoutExerciseAction
    | DeleteWorkoutExerciseAction
    | AddWorkoutExerciseSetAction
    | ModifyWorkoutExerciseSetAction
    | DeleteWorkoutExerciseSetAction
    | ModifyExerciseAction;
