import { combineReducers } from 'redux';
import exerciseReducer from './exercise/exerciseReducer';
import supersetReducer from './superset/supersetReducer';
import { ExerciseState } from './exercise/types';
import { SupersetState } from './superset/types';

export type State = {
    exercise: ExerciseState;
    superset: SupersetState;
};

const rootReducer = combineReducers({
    exercise: exerciseReducer,
    superset: supersetReducer
});

export default rootReducer;
