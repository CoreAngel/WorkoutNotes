import { Workout, WorkoutExercise } from '../redux/workout/types';
import store from '../redux/store';

export type WorkoutExerciseWithSupersetData = WorkoutExercise & {
    supersetName?: string;
    supersetId?: number;
};

const getWorkoutExercisesArrayFromWorkout = (
    workout: Workout
): WorkoutExerciseWithSupersetData[] => {
    const supersetsWorkouts = workout.supersets.reduce(
        (arr, acc): WorkoutExerciseWithSupersetData[] => {
            const superset = store
                .getState()
                .superset.supersets.find(item => item.id === acc.supersetId);

            const supersetExercisesWithCorrectOrder = acc.exercises.map(
                (item): WorkoutExerciseWithSupersetData => ({
                    ...item,
                    order: acc.order + item.order / 10,
                    supersetId: superset ? superset.id : undefined,
                    supersetName: superset ? superset.name : undefined
                })
            );

            return [...arr, ...supersetExercisesWithCorrectOrder];
        },
        []
    );

    return [...supersetsWorkouts, ...workout.exercises];
};

export default getWorkoutExercisesArrayFromWorkout;
