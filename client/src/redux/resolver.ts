import store from './store';
import { Superset } from './superset/types';
import { Exercise } from './exercise/types';
import { Plan } from './plan/types';

export type ResolveExercise = {
    exercise: Exercise;
    order: number;
};

export type ResolveSuperset = {
    id?: number;
    name: string;
    desc: string;
    exercises: ResolveExercise[];
};

export type ResolvePlan = {
    id?: number;
    name: string;
    desc: string;
    exercises: ResolveExercise[];
    supersets: ResolveSuperset[];
};

const resolveSuperset = (superset: Superset, exercises?: Exercise[]): ResolveSuperset => {
    const exercisesStore = exercises || store.getState().exercise.exercises;
    const supersetExercises = superset.exercises;

    const resolvedExercises = exercisesStore
        .reduce((acc, ex): ResolveExercise[] => {
            const exercise = supersetExercises.find(supEx => supEx.exerciseId === ex.id);
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

const resolvePlan = (plan: Plan): ResolvePlan => {
    const exercisesStore = store.getState().exercise.exercises;
    const supersetStore = store.getState().superset.supersets;
    const planExercises = plan.exercises;
    const planSupersets = plan.supersets;

    const resolvedExercises = exercisesStore
        .reduce((acc, ex): ResolveExercise[] => {
            const exercise = planExercises.find(planEx => planEx.id === ex.id);
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

    const resolvedSupersets = planSupersets
        .reduce((acc, ex): ResolveSuperset[] => {
            const superset = supersetStore.find(planEx => planEx.id === ex.id);
            const resolverSuperset = resolveSuperset(superset);
            if (resolverSuperset) {
                acc.push(resolverSuperset);
            }
            return acc;
        }, [])
        .sort((prev, next) => prev.order - next.order);

    const { id, name, desc } = plan;

    return {
        id,
        name,
        desc,
        exercises: resolvedExercises,
        supersets: resolvedSupersets
    };
};

export default {
    resolveSuperset,
    resolvePlan
};
