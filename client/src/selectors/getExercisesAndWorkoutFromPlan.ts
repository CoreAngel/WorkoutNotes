import getIndexesMap from './getIndexesMap';
import getExerciseToAdd from './getExerciseToAdd';
import getExercisesFromSupersetToAdd from './getExercisesFromSupersetToAdd';
import store from '../redux/store';
import { Workout } from '../redux/workout/types';
import { WorkoutExercisePayload } from '../redux/exercise/types';

type ReturnType = {
    exercises: WorkoutExercisePayload[];
    workout: Workout;
};

const getExercisesAndWorkoutFromPlan = (planId: number): ReturnType => {
    let indexesMap = getIndexesMap();
    const plan = store.getState().plan.plans.find(item => item.id === planId);
    const workoutWithId: Workout = {
        id: indexesMap.workoutIndex,
        planId,
        finished: false,
        active: false,
        supersets: [],
        exercises: [],
        date: new Date().toUTCString()
    };

    const exercisesData = plan.exercises.map(item => {
        const { payloadExercise, payloadWorkout, indexes } = getExerciseToAdd(
            workoutWithId,
            item.id,
            indexesMap
        );
        indexesMap = indexes;
        return {
            payloadExercise,
            payloadWorkout: {
                ...payloadWorkout,
                exercises: [
                    {
                        ...payloadWorkout.exercises[0],
                        order: item.order
                    }
                ]
            }
        };
    });

    const exercise = exercisesData.reduce(
        (arr, acc) => {
            return {
                exercises: [...arr.exercises, acc.payloadExercise],
                workout: {
                    ...acc.payloadWorkout,
                    exercises: [...arr.workout.exercises, ...acc.payloadWorkout.exercises]
                }
            };
        },
        {
            exercises: [],
            workout: {
                exercises: []
            } as Workout
        }
    );

    const supersetData = plan.supersets.map(item => {
        const { payloadWorkout, payloadsExercise, indexes } = getExercisesFromSupersetToAdd(
            workoutWithId,
            item.id,
            indexesMap
        );
        indexesMap = indexes;
        return {
            payloadsExercise,
            payloadWorkout: {
                ...payloadWorkout,
                supersets: [
                    {
                        ...payloadWorkout.supersets[0],
                        order: item.order
                    }
                ]
            }
        };
    });

    const superset = supersetData.reduce(
        (arr, acc) => {
            return {
                exercises: [...arr.exercises, ...acc.payloadsExercise],
                workout: {
                    ...acc.payloadWorkout,
                    supersets: [...arr.workout.supersets, ...acc.payloadWorkout.supersets]
                }
            };
        },
        {
            exercises: [],
            workout: {
                supersets: []
            } as Workout
        }
    );

    const finalExercises = [...exercise.exercises, ...superset.exercises];
    const finalWorkout = {
        ...exercise.workout,
        supersets: [...superset.workout.supersets]
    };

    return {
        exercises: finalExercises,
        workout: finalWorkout
    };
};

export default getExercisesAndWorkoutFromPlan;
