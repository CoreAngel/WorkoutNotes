import { applyMiddleware, combineReducers, createStore } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import exerciseReducer from './exercise/exerciseReducer';
import supersetReducer from './superset/supersetReducer';
import { ExerciseStore } from './exercise/types';
import { SupersetStore } from './superset/types';

export type Store = {
    exercise: ExerciseStore;
    superset: SupersetStore;
};

const reducers = combineReducers({
    exercise: exerciseReducer,
    superset: supersetReducer
});

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default store;
