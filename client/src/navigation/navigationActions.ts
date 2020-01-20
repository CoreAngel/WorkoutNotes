import { navigate } from './navigationService';
import {
    BROWSE,
    BROWSE_EXERCISES,
    BROWSE_PLANS,
    BROWSE_SUPERSETS,
    BROWSE_WORKOUTS,
    EXERCISE,
    PLAN,
    RUN_PLAN,
    SUPERSET,
    WORKOUT
} from './routes';
import { Workout } from '../redux/workout/types';
import store from '../redux/store';
import { Exercise } from '../redux/exercise/types';
import { Superset } from '../redux/superset/types';
import { Plan } from '../redux/plan/types';

export const navigateToRunPlan = () => {
    navigate(RUN_PLAN, { title: 'Run plan' });
};

export const navigateToAddExercise = (exercise?: Exercise) => {
    if (!exercise) {
        navigate(EXERCISE, { title: 'Add exercise', exercise: null });
        return;
    }
    navigate(EXERCISE, { title: `Exercise: ${exercise.name}`, exercise });
};

export const navigateToCreateSuperset = (superset?: Superset) => {
    if (!superset) {
        navigate(SUPERSET, { title: 'Create superset', superset: null });
        return;
    }
    navigate(SUPERSET, { title: `Superset: ${superset.name}`, superset });
};

export const navigateToCreatePlan = (plan?: Plan) => {
    if (!plan) {
        navigate(PLAN, { title: 'Create plan', plan: null });
        return;
    }
    navigate(PLAN, { title: `Plan: ${plan.name}`, plan });
};

export const navigateToWorkout = (workout: Workout) => {
    const workoutName =
        workout.name != null
            ? workout.name
            : store.getState().plan.plans.find(item => item.id === workout.planId).name;
    navigate(WORKOUT, { title: `Workout: ${workoutName}` });
};

export const navigateToBrowse = () => {
    navigate(BROWSE, { title: 'Browse' });
};

export const navigateToBrowseExercises = () => {
    navigate(BROWSE_EXERCISES, { title: 'Browse: exercises' });
};

export const navigateToBrowseSupersets = () => {
    navigate(BROWSE_SUPERSETS, { title: 'Browse: supersets' });
};

export const navigateToBrowsePlans = () => {
    navigate(BROWSE_PLANS, { title: 'Browse: plans' });
};

export const navigateToBrowseWorkouts = () => {
    navigate(BROWSE_WORKOUTS, { title: 'Browse: workouts' });
};
