import { applyMiddleware, combineReducers, createStore } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import exerciseReducer from './exercise/exerciseReducer';
import supersetReducer from './superset/supersetReducer';
import planReducer from './plan/planReducer';
import { ExerciseStore } from './exercise/types';
import { SupersetStore } from './superset/types';
import { PlanStore } from './plan/types';

export type Store = {
    exercise: ExerciseStore;
    superset: SupersetStore;
    plan: PlanStore;
};

const reducers = combineReducers({
    exercise: exerciseReducer,
    superset: supersetReducer,
    plan: planReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware, loggerMiddleware));

export default store;
