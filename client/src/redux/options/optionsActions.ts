import {
    CHANGE_WEIGHT_UNIT,
    ChangeWeightUnitAction,
    CLEAR_AUTH_TOKEN,
    ClearAuthTokenAction,
    SET_AUTH_TOKEN,
    SetAuthTokenAction,
    Weight
} from './types';

export const changeWeightUnit = (unit: Weight): ChangeWeightUnitAction => ({
    type: CHANGE_WEIGHT_UNIT,
    unit
});

export const setAuthToken = (token: string): SetAuthTokenAction => ({
    type: SET_AUTH_TOKEN,
    token
});

export const clearAuthToken = (): ClearAuthTokenAction => ({
    type: CLEAR_AUTH_TOKEN
});
