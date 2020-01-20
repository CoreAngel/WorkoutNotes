import store from '../redux/store';
import { Workout } from '../redux/workout/types';
import getIndexesMap, { WorkoutIndexMap } from './getIndexesMap';
import { WorkoutExercisePayload } from '../redux/exercise/types';

type ReturnType = {
    payloadsExercise: WorkoutExercisePayload[];
    payloadWorkout: Workout;
    indexes: WorkoutIndexMap;
};

const getExercisesFromSupersetToAdd = (
    workout: Workout,
    supersetId: number,
    indexes: WorkoutIndexMap = getIndexesMap()
): ReturnType | null => {
    const superset = store.getState().superset.supersets.find(item => item.id === supersetId);
    if (!superset) {
        return null;
    }

    const exercisesArr = superset.exercises.map(item => {
        return {
            order: item.order,
            exercise: store
                .getState()
                .exercise.exercises.find(exItem => exItem.id === item.exerciseId)
        };
    });

    let { workoutExercisesIndexMap } = indexes;
    const payloadsExercise = exercisesArr
        .sort((i1, i2) => i1.order - i2.order)
        .map(item => {
            const { id } = item.exercise;

            const exerciseWorkoutId = workoutExercisesIndexMap.find(
                indItem => indItem.exerciseId === id
            ).index;
            const payloadExercise = {
                exerciseId: id,
                workout: {
                    id: exerciseWorkoutId,
                    setIndex: 0,
                    sets: [],
                    workoutId: workout.id
                }
            };

            workoutExercisesIndexMap = workoutExercisesIndexMap.map(indItem => {
                if (indItem.exerciseId === id) {
                    return {
                        ...indItem,
                        index: indItem.index + 1
                    };
                }
                return indItem;
            });

            return payloadExercise;
        });

    const payloadWorkout: Workout = {
        ...workout,
        supersets: [
            ...workout.supersets,
            {
                supersetId: superset.id,
                exercises: [
                    ...payloadsExercise.map((item, index) => {
                        return {
                            order: index,
                            exerciseId: item.exerciseId,
                            exerciseWorkoutId: item.workout.id
                        };
                    })
                ],
                order: workout.exercises.length + workout.supersets.length
            }
        ]
    };
    return {
        payloadsExercise,
        payloadWorkout,
        indexes: {
            ...indexes,
            workoutExercisesIndexMap
        }
    };
};

export default getExercisesFromSupersetToAdd;
