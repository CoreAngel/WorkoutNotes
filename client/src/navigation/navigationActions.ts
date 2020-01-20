import { navigate } from './navigationService';
import { EXERCISE, PLAN, RUN_PLAN, SUPERSET, WORKOUT } from './routes';
import { Workout } from '../redux/workout/types';
import store from '../redux/store';

export const navigateToRunPlan = () => {
    navigate(RUN_PLAN, { title: 'Run plan' });
};

export const navigateToAddExercise = () => {
    navigate(EXERCISE, { title: 'Add exercise' });
};

export const navigateToCreateSuperset = () => {
    navigate(SUPERSET, { title: 'Create superset' });
};

export const navigateToCreatePlan = () => {
    navigate(PLAN, { title: 'Create plan' });
};

export const navigateToWorkout = (workout: Workout) => {
    const workoutName =
        workout.name != null
            ? workout.name
            : store.getState().plan.plans.find(item => item.id === workout.planId).name;
    navigate(WORKOUT, { title: `Workout: ${workoutName}` });
};
