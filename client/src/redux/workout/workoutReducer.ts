import {
    WorkoutStore,
    WorkoutAction,
    ADD_WORKOUT,
    AddWorkoutAction,
    DELETE_WORKOUT,
    DeleteWorkoutAction,
    MODIFY_WORKOUT,
    ModifyWorkoutAction,
    SET_WORKOUT_FINISHED,
    SetWorkoutFinishedAction,
    SET_WORKOUT_ACTIVE,
    SetWorkoutActiveAction
} from './types';

const initialState: WorkoutStore = {
    workouts: [
        {
            id: 0,
            date: new Date().toUTCString(),
            planId: 0,
            finished: false,
            active: false,
            exercises: [
                {
                    exerciseId: 0,
                    exerciseWorkoutId: 0,
                    order: 0
                },
                {
                    exerciseId: 2,
                    exerciseWorkoutId: 0,
                    order: 2
                }
            ],
            supersets: [
                {
                    order: 1,
                    supersetId: 0,
                    exercises: [
                        {
                            exerciseId: 0,
                            exerciseWorkoutId: 0,
                            order: 0
                        },
                        {
                            exerciseId: 1,
                            exerciseWorkoutId: 0,
                            order: 1
                        }
                    ]
                }
            ]
        },
        {
            id: 1,
            date: new Date().toUTCString(),
            name: 'Without plan id',
            finished: true,
            active: false,
            exercises: [
                {
                    exerciseId: 0,
                    exerciseWorkoutId: 0,
                    order: 0
                },
                {
                    exerciseId: 2,
                    exerciseWorkoutId: 0,
                    order: 2
                }
            ],
            supersets: [
                {
                    order: 1,
                    supersetId: 0,
                    exercises: [
                        {
                            exerciseId: 0,
                            exerciseWorkoutId: 0,
                            order: 0
                        },
                        {
                            exerciseId: 1,
                            exerciseWorkoutId: 0,
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
                index: addAction.workout.id + 1
            };
        }
        case SET_WORKOUT_FINISHED: {
            const setFinishedAction = action as SetWorkoutFinishedAction;
            const workouts = state.workouts.map(item => {
                if (item.id === setFinishedAction.workoutId) {
                    return {
                        ...item,
                        finished: true
                    };
                }
                return item;
            });

            return {
                ...state,
                workouts: [...workouts]
            };
        }
        case SET_WORKOUT_ACTIVE: {
            const setActiveAction = action as SetWorkoutActiveAction;
            const workouts = state.workouts.map(item => {
                return {
                    ...item,
                    active: item.id === setActiveAction.workoutId
                };
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
