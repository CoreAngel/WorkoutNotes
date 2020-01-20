import store from '../redux/store';

export type WorkoutIndexMap = {
    workoutExercisesIndexMap: {
        exerciseId: number;
        index: number;
    }[];
    workoutIndex: number;
};

const getIndexesMap = (): WorkoutIndexMap => {
    const { exercise, workout } = store.getState();

    const workoutExercisesIndexMap = exercise.exercises.map(item => {
        const { id, index } = item;
        return {
            exerciseId: id,
            index
        };
    });

    return {
        workoutIndex: workout.index,
        workoutExercisesIndexMap
    };
};

export default getIndexesMap;
