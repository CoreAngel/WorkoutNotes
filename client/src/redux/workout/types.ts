export type WorkoutExercise = {
    exerciseId: number;
    order: number;
};

export type WorkoutSuperset = {
    exercisesId: number[];
    order: number;
};

export type Workout = {
    id?: number;
    planId: number;
    date: string;
    exercises: WorkoutExercise[];
    supersets: WorkoutSuperset[];
};

export type WorkoutStore = {
    workouts: Workout[];
    index: number;
};

const PREFIX = 'workout';
export const ADD_WORKOUT = `${PREFIX}/ADD_WORKOUT`;
export const DELETE_WORKOUT = `${PREFIX}/DELETE_WORKOUT`;
export const MODIFY_WORKOUT = `${PREFIX}/MODIFY_WORKOUT`;

export interface AddWorkoutAction {
    type: typeof ADD_WORKOUT;
    workout: Workout;
}
export interface DeleteWorkoutAction {
    type: typeof DELETE_WORKOUT;
    workout: Workout;
}

export interface ModifyWorkoutAction {
    type: typeof MODIFY_WORKOUT;
    workout: Workout;
}

export type WorkoutAction = AddWorkoutAction | DeleteWorkoutAction | ModifyWorkoutAction;
