import store from './store';
import { Superset } from './superset/types';
import { Exercise } from './exercise/types';

export interface ResolveExercise {
    exercise: Exercise;
    order: number;
}

export interface ResolveSuperset {
    id?: number;
    name: string;
    desc: string;
    exercises: ResolveExercise[];
}

const resolveSuperset = (
    superset: Superset,
    exercises?: Exercise[]
): ResolveSuperset => {
    const exercisesStore = exercises || store.getState().exercise.exercises;
    const supersetExercises = superset.exercises;

    const resolvedExercises = exercisesStore
        .reduce((acc, ex): ResolveExercise[] => {
            const exercise = supersetExercises.find(
                supEx => supEx.exerciseId === ex.id
            );
            if (exercise) {
                const resolvedExercise: ResolveExercise = {
                    exercise: ex,
                    order: exercise.order
                };
                acc.push(resolvedExercise);
            }
            return acc;
        }, [])
        .sort((prev, next) => prev.order - next.order);

    const { id, name, desc } = superset;

    return {
        id,
        name,
        desc,
        exercises: resolvedExercises
    };
};

export default resolveSuperset;
