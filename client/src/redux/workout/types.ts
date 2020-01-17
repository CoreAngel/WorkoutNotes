export type WorkoutExercise = {
    exerciseId: number;
    workoutId: number;
    order: number;
};

export type WorkoutSuperset = {
    supersetId: number;
    exercises: WorkoutExercise[];
    order: number;
};

export type Workout = {
    id?: number;
    planId?: number;
    name?: string;
    date: string;
    finished: boolean;
    exercises: WorkoutExercise[];
    supersets: WorkoutSuperset[];
};

export type WorkoutStore = {
    workouts: Workout[];
    index: number;
};

const PREFIX = 'workout';
export const ADD_WORKOUT = `${PREFIX}/ADD_WORKOUT`;
export const SET_WORKOUT_FINISHED = `${PREFIX}/SET_WORKOUT_FINISHED`;
export const DELETE_WORKOUT = `${PREFIX}/DELETE_WORKOUT`;
export const MODIFY_WORKOUT = `${PREFIX}/MODIFY_WORKOUT`;

export interface AddWorkoutAction {
    type: typeof ADD_WORKOUT;
    workout: Workout;
}

export interface SetWorkoutFinishedAction {
    type: typeof SET_WORKOUT_FINISHED;
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
    | SetWorkoutFinishedAction;
