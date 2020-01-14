export type WorkoutExercise = {
    exerciseId: number;
    workoutId: number;
    order: number;
};

export type WorkoutSuperset = {
    exercises: WorkoutExercise[];
    order: number;
};

export type Workout = {
    id?: number;
    planId?: number;
    name?: string;
    date: string;
    active: boolean;
    exercises: WorkoutExercise[];
    supersets: WorkoutSuperset[];
};

export type WorkoutStore = {
    workouts: Workout[];
    index: number;
};

const PREFIX = 'workout';
export const ADD_WORKOUT = `${PREFIX}/ADD_WORKOUT`;
export const SET_WORKOUT_ACTIVE = `${PREFIX}/SET_WORKOUT_ACTIVE`;
export const SET_WORKOUT_INACTIVE = `${PREFIX}/SET_WORKOUT_INACTIVE`;
export const DELETE_WORKOUT = `${PREFIX}/DELETE_WORKOUT`;
export const MODIFY_WORKOUT = `${PREFIX}/MODIFY_WORKOUT`;

export interface AddWorkoutAction {
    type: typeof ADD_WORKOUT;
    workout: Workout;
}

export interface SetWorkoutActiveAction {
    type: typeof SET_WORKOUT_ACTIVE;
    workoutId: number;
}

export interface SetWorkoutInactiveAction {
    type: typeof SET_WORKOUT_INACTIVE;
    workoutId: number;
}

export interface DeleteWorkoutAction {
    type: typeof DELETE_WORKOUT;
    workout: Workout;
}

export interface ModifyWorkoutAction {
    type: typeof MODIFY_WORKOUT;
    workout: Workout;
}

export type WorkoutAction =
    | AddWorkoutAction
    | DeleteWorkoutAction
    | ModifyWorkoutAction
    | SetWorkoutActiveAction
    | SetWorkoutInactiveAction;
