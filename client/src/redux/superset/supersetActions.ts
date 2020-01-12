import {
    ADD_SUPERSET,
    AddSupersetAction,
    DELETE_SUPERSET,
    DeleteSupersetAction,
    MODIFY_SUPERSET,
    ModifySupersetAction,
    Superset
} from './types';

export const addSuperset = (superset: Superset): AddSupersetAction => ({
    type: ADD_SUPERSET,
    superset
});

export const deleteSuperset = (superset: Superset): DeleteSupersetAction => ({
    type: DELETE_SUPERSET,
    superset
});

export const modifySuperset = (superset: Superset): ModifySupersetAction => ({
    type: MODIFY_SUPERSET,
    superset
});
