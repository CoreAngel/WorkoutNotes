import {
    ADD_EXERCISE,
    ADD_WORKOUT_EXERCISE,
    MULTI_ADD_WORKOUT_EXERCISE,
    AddExerciseAction,
    AddWorkoutExerciseAction,
    MultiAddWorkoutExerciseAction,
    DELETE_EXERCISE,
    DELETE_WORKOUT_EXERCISE,
    DeleteExerciseAction,
    DeleteWorkoutExerciseAction,
    ExerciseAction,
    ExerciseStore,
    MODIFY_WORKOUT_EXERCISE,
    ModifyWorkoutExerciseAction
} from './types';

const initialState: ExerciseStore = {
    exercises: [
        {
            id: 0,
            name: 'Bench press',
            desc: 'description',
            addBody: false,
            index: 0,
            workouts: []
        },
        {
            id: 1,
            name: 'Squad',
            desc: 'description',
            addBody: false,
            index: 0,
            workouts: []
        },
        {
            id: 2,
            name: 'Dead lift',
            desc: 'description',
            addBody: false,
            index: 0,
            workouts: []
        }
    ],
    index: 3
};

const exerciseReducer = (state = initialState, action: ExerciseAction) => {
    switch (action.type) {
        case ADD_EXERCISE: {
            const addAction = action as AddExerciseAction;
            addAction.exercise.id = state.index;

            return {
                ...state,
                exercises: [...state.exercises, addAction.exercise],
                index: state.index + 1
            };
        }
        case DELETE_EXERCISE: {
            const deleteAction = action as DeleteExerciseAction;
            return {
                ...state,
                exercises: [...state.exercises.filter(ex => ex.id !== deleteAction.exercise.id)]
            };
        }
        case ADD_WORKOUT_EXERCISE: {
            const addAction = action as AddWorkoutExerciseAction;
            const { exerciseId, workout } = addAction.payload;

            const exercises = state.exercises.map(item => {
                if (item.id === exerciseId) {
                    workout.id = workout.id === undefined ? item.index : workout.id;

                    return {
                        ...item,
                        workouts: [...item.workouts, workout],
                        index: item.index + 1
                    };
                }
                return item;
            });

            return {
                ...state,
                exercises
            };
        }
        case MULTI_ADD_WORKOUT_EXERCISE: {
            const addAction = action as MultiAddWorkoutExerciseAction;

            const exercises = state.exercises.map(item => {
                const payloadItems = addAction.payload.filter(
                    payloadItem => payloadItem.exerciseId === item.id
                );
                const payloadExercises = payloadItems.map(payloadItem => payloadItem.workout);

                return {
                    ...item,
                    workouts: [...item.workouts, ...payloadExercises],
                    index: item.index + payloadExercises.length
                };
            });

            return {
                ...state,
                exercises
            };
        }
        case DELETE_WORKOUT_EXERCISE: {
            const deleteAction = action as DeleteWorkoutExerciseAction;
            const { exerciseId, workout } = deleteAction.payload;

            const exercises = state.exercises.map(item => {
                if (item.id === exerciseId) {
                    const workouts = item.workouts.filter(
                        workoutItem => workoutItem.id !== workout.id
                    );

                    return {
                        ...item,
                        workouts
                    };
                }
                return item;
            });

            return {
                ...state,
                exercises
            };
        }
        case MODIFY_WORKOUT_EXERCISE: {
            const modifyAction = action as ModifyWorkoutExerciseAction;
            const { exerciseId, workout } = modifyAction.payload;

            const exercises = state.exercises.map(item => {
                if (item.id === exerciseId) {
                    const workouts = item.workouts.filter(
                        workoutItem => workoutItem.id !== workout.id
                    );

                    return {
                        ...item,
                        workouts: [...workouts, workout]
                    };
                }
                return item;
            });

            return {
                ...state,
                exercises
            };
        }
        default:
            return state;
    }
};

export default exerciseReducer;
