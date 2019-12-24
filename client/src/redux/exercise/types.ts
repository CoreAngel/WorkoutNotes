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

export type ExerciseState = {
    exercises: Exercise[];
};

export const ADD_EXERCISE = 'ADD_EXERCISE';
export const DELETE_EXERCISE = 'DELETE_EXERCISE';

interface AddExerciseAction {
    type: typeof ADD_EXERCISE;
    exercise: Exercise;
}
interface DeleteExerciseAction {
    type: typeof DELETE_EXERCISE;
    exercise: Exercise;
}

export type ExerciseAction = AddExerciseAction | DeleteExerciseAction;
