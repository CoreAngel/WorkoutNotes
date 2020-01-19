import { ExerciseWorkout } from '../redux/exercise/types';
import { WorkoutExerciseWithSupersetData } from './getWorkoutExercisesFromWorkout';
import store from '../redux/store';

export type WorkoutExerciseWithExternalData = ExerciseWorkout & {
    exerciseId: number;
    exerciseName: string;
    order: number;
    supersetId?: number;
    supersetName?: string;
};

const getWorkoutExercise = (
    workoutExercise: WorkoutExerciseWithSupersetData
): WorkoutExerciseWithExternalData | null => {
    const { exercises } = store.getState().exercise;

    const exercise = exercises.find(item => item.id === workoutExercise.exerciseId);
    if (!exercise) return null;

    const exerciseWorkout = exercise.workouts.find(
        item => item.id === workoutExercise.exerciseWorkoutId
    );
    if (!exerciseWorkout) return null;

    return {
        ...exerciseWorkout,
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        order: workoutExercise.order,
        supersetId: workoutExercise.supersetId,
        supersetName: workoutExercise.supersetName
    };
};

export default getWorkoutExercise;
