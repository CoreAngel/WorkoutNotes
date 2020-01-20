import store from '../redux/store';
import { WorkoutExercisePayload } from '../redux/exercise/types';
import { Workout } from '../redux/workout/types';
import getIndexesMap, { WorkoutIndexMap } from './getIndexesMap';

type ReturnType = {
    payloadExercise: WorkoutExercisePayload;
    payloadWorkout: Workout;
    indexes: WorkoutIndexMap;
};

const getExerciseToAdd = (
    workout: Workout,
    exerciseId: number,
    indexes: WorkoutIndexMap = getIndexesMap()
): ReturnType | null => {
    const exercise = store.getState().exercise.exercises.find(item => item.id === exerciseId);
    if (!exercise) {
        return null;
    }

    let { workoutExercisesIndexMap } = indexes;
    const exerciseWorkoutId = workoutExercisesIndexMap.find(item => item.exerciseId === exerciseId)
        .index;
    workoutExercisesIndexMap = workoutExercisesIndexMap.map(item => {
        if (item.exerciseId === exerciseId) {
            return {
                ...item,
                index: item.index + 1
            };
        }
        return item;
    });

    const payloadExercise: WorkoutExercisePayload = {
        exerciseId,
        workout: {
            id: exerciseWorkoutId,
            setIndex: 0,
            sets: [],
            workoutId: workout.id
        }
    };

    const payloadWorkout: Workout = {
        ...workout,
        exercises: [
            ...workout.exercises,
            {
                exerciseId,
                exerciseWorkoutId,
                order: workout.exercises.length + workout.supersets.length
            }
        ]
    };

    return {
        payloadExercise,
        payloadWorkout,
        indexes: {
            ...indexes,
            workoutExercisesIndexMap
        }
    };
};

export default getExerciseToAdd;
