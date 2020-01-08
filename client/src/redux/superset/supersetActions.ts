import { ADD_SUPERSET, DELETE_SUPERSET, MODIFY_SUPERSET, SET_INDEX, Superset } from './types';

export const addSuperset = (superset: Superset) => ({
    type: ADD_SUPERSET,
    superset
});

export const deleteSuperset = (superset: Superset) => ({
    type: DELETE_SUPERSET,
    superset
});

export const modifySuperset = (superset: Superset) => ({
    type: MODIFY_SUPERSET,
    superset
});

export const setIndex = (index: number) => ({
    type: SET_INDEX,
    index
});
