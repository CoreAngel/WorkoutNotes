import { combineReducers } from 'redux';
import exerciseReducer from './exercise/exerciseReducer';
import supersetReducer from './superset/supersetReducer';
import { ExerciseStore } from './exercise/types';
import { SupersetStore } from './superset/types';

export type Store = {
    exercise: ExerciseStore;
    superset: SupersetStore;
};

const rootReducer = combineReducers({
    exercise: exerciseReducer,
    superset: supersetReducer
});

export default rootReducer;
