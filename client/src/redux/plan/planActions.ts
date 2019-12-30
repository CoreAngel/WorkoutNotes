import { ADD_PLAN, DELETE_PLAN, MODIFY_PLAN, SET_INDEX, Plan } from './types';

export const addPlan = (plan: Plan) => ({
    type: ADD_PLAN,
    plan
});

export const deletePlan = (plan: Plan) => ({
    type: DELETE_PLAN,
    plan
});

export const modifyPlan = (plan: Plan) => ({
    type: MODIFY_PLAN,
    plan
});

export const setIndex = (index: number) => ({
    type: SET_INDEX,
    index
});
