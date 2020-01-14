import {
    WorkoutStore,
    WorkoutAction,
    ADD_WORKOUT,
    AddWorkoutAction,
    DELETE_WORKOUT,
    DeleteWorkoutAction,
    MODIFY_WORKOUT,
    ModifyWorkoutAction,
    SET_WORKOUT_ACTIVE,
    SET_WORKOUT_INACTIVE,
    SetWorkoutActiveAction,
    SetWorkoutInactiveAction
} from './types';

const initialState: WorkoutStore = {
    workouts: [
        {
            id: 0,
            date: new Date().toDateString(),
            planId: 0,
            active: false,
            exercises: [
                {
                    exerciseId: 0,
                    workoutId: 0,
                    order: 0
                },
                {
                    exerciseId: 2,
                    workoutId: 0,
                    order: 2
                }
            ],
            supersets: [
                {
                    order: 1,
                    exercises: [
                        {
                            exerciseId: 0,
                            workoutId: 0,
                            order: 0
                        },
                        {
                            exerciseId: 1,
                            workoutId: 0,
                            order: 1
                        }
                    ]
                }
            ]
        },
        {
            id: 1,
            date: new Date().toDateString(),
            name: 'Without plan id',
            active: true,
            exercises: [
                {
                    exerciseId: 0,
                    workoutId: 0,
                    order: 0
                },
                {
                    exerciseId: 2,
                    workoutId: 0,
                    order: 2
                }
            ],
            supersets: [
                {
                    order: 1,
                    exercises: [
                        {
                            exerciseId: 0,
                            workoutId: 0,
                            order: 0
                        },
                        {
                            exerciseId: 1,
                            workoutId: 0,
                            order: 1
                        }
                    ]
                }
            ]
        }
    ],
    index: 2
};

const workoutReducer = (state = initialState, action: WorkoutAction) => {
    switch (action.type) {
        case ADD_WORKOUT: {
            const addAction = action as AddWorkoutAction;
            addAction.workout.id =
                addAction.workout.id === undefined ? state.index : addAction.workout.id;
            return {
                ...state,
                workouts: [...state.workouts, addAction.workout],
                index: addAction.workout.id === undefined ? state.index + 1 : addAction.workout.id
            };
        }
        case SET_WORKOUT_ACTIVE: {
            const setActiveAction = action as SetWorkoutActiveAction;
            const workouts = state.workouts.map(item => {
                if (item.id === setActiveAction.workoutId) {
                    return {
                        ...item,
                        active: true
                    };
                }
                return item;
            });

            return {
                ...state,
                workouts: [...workouts]
            };
        }
        case SET_WORKOUT_INACTIVE: {
            const setInactiveAction = action as SetWorkoutInactiveAction;
            const workouts = state.workouts.map(item => {
                if (item.id === setInactiveAction.workoutId) {
                    return {
                        ...item,
                        active: false
                    };
                }
                return item;
            });

            return {
                ...state,
                workouts: [...workouts]
            };
        }
        case DELETE_WORKOUT: {
            const deleteAction = action as DeleteWorkoutAction;
            return {
                ...state,
                workouts: [...state.workouts.filter(sup => sup.id !== deleteAction.workout.id)]
            };
        }
        case MODIFY_WORKOUT: {
            const modifyAction = action as ModifyWorkoutAction;
            const workouts = state.workouts.map(item => {
                if (item.id === modifyAction.workout.id) {
                    return modifyAction.workout;
                }
                return item;
            });

            return {
                ...state,
                workouts: [...workouts]
            };
        }
        default:
            return state;
    }
};

export default workoutReducer;
