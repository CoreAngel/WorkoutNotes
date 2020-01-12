export type Result = {
    weight: number;
    reps: number;
};

export type Set = {
    goal: Result | null;
    achieved: Result;
};

export type WorkoutExercise = {
    id?: number;
    planId: number;
    sets: Set[];
};

export type Exercise = {
    id?: number;
    name: string;
    desc: string;
    addBody: boolean;
    workouts?: WorkoutExercise[];
    index?: number;
};

export type ExerciseStore = {
    exercises: Exercise[];
    index: number;
};

const PREFIX = 'exercise';
export const ADD_EXERCISE = `${PREFIX}/ADD_EXERCISE`;
export const DELETE_EXERCISE = `${PREFIX}/DELETE_EXERCISE`;

export interface AddExerciseAction {
    type: typeof ADD_EXERCISE;
    exercise: Exercise;
}
export interface DeleteExerciseAction {
    type: typeof DELETE_EXERCISE;
    exercise: Exercise;
}

export type ExerciseAction = AddExerciseAction | DeleteExerciseAction;
