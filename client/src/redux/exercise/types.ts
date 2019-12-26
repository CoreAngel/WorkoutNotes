export enum WeightUnit {
    KG = 'kg',
    LB = 'lb'
}

export const Weight = [
    {
        unit: WeightUnit.KG,
        name: 'kilograms',
        defaultSelected: true
    },
    {
        unit: WeightUnit.LB,
        name: 'pounds',
        defaultSelected: false
    }
];

export enum TimeUnit {
    MIN = 'min',
    SEC = 'sec',
    HR = 'hr'
}

export const Time = [
    {
        unit: TimeUnit.SEC,
        name: 'seconds',
        defaultSelected: true
    },
    {
        unit: TimeUnit.MIN,
        name: 'minutes',
        defaultSelected: false
    },
    {
        unit: TimeUnit.HR,
        name: 'hours',
        defaultSelected: false
    }
];

export type Exercise = {
    id?: number;
    name: string;
    desc: string;
    weight: {
        checked: boolean;
        unit: WeightUnit;
        body: boolean;
    };
    time: {
        checked: boolean;
        unit: TimeUnit;
    };
};

export type ExerciseStore = {
    exercises: Exercise[];
    index: number;
};

const PREFIX = 'exercise';
export const ADD_EXERCISE = `${PREFIX}/ADD_EXERCISE`;
export const DELETE_EXERCISE = `${PREFIX}/DELETE_EXERCISE`;
export const SET_INDEX = `${PREFIX}/SET_INDEX`;

export interface AddExerciseAction {
    type: typeof ADD_EXERCISE;
    exercise: Exercise;
}
export interface DeleteExerciseAction {
    type: typeof DELETE_EXERCISE;
    exercise: Exercise;
}

export interface SetIndexAction {
    type: typeof SET_INDEX;
    index: number;
}

export type ExerciseAction =
    | AddExerciseAction
    | DeleteExerciseAction
    | SetIndexAction;
