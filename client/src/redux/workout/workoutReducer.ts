import {
    WorkoutStore,
    WorkoutAction,
    ADD_WORKOUT,
    AddWorkoutAction,
    DELETE_WORKOUT,
    DeleteWorkoutAction,
    MODIFY_WORKOUT,
    ModifyWorkoutAction
} from './types';

const initialState: WorkoutStore = {
    workouts: [
        {
            id: 0,
            date: new Date().toDateString(),
            planId: 0,
            exercises: [
                {
                    exerciseId: 0,
                    order: 0
                },
                {
                    exerciseId: 2,
                    order: 2
                }
            ],
            supersets: [
                {
                    order: 1,
                    exercisesId: [1, 2]
                }
            ]
        },
        {
            id: 0,
            date: new Date().toDateString(),
            planId: 1,
            exercises: [
                {
                    exerciseId: 0,
                    order: 0
                },
                {
                    exerciseId: 2,
                    order: 2
                }
            ],
            supersets: [
                {
                    order: 1,
                    exercisesId: [1, 2]
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
            addAction.workout.id = state.index;
            return {
                ...state,
                workouts: [...state.workouts, addAction.workout],
                index: state.index + 1
            };
        }
        case DELETE_WORKOUT: {
            const deleteAction = action as DeleteWorkoutAction;
            return {
                ...state,
                supersets: [...state.workouts.filter(sup => sup.id !== deleteAction.workout.id)]
            };
        }
        case MODIFY_WORKOUT: {
            const modifyAction = action as ModifyWorkoutAction;
            const index = state.workouts.findIndex(item => item.id === modifyAction.workout.id);
            if (index < 0) {
                return state;
            }
            const copySupersets = [...state.workouts];
            copySupersets[index] = modifyAction.workout;
            return {
                ...state,
                supersets: [...copySupersets]
            };
        }
        default:
            return state;
    }
};

export default workoutReducer;
