import {
    ADD_PLAN,
    AddPlanAction,
    DELETE_PLAN,
    DeletePlanAction,
    MODIFY_PLAN,
    ModifyPlanAction,
    Plan
} from './types';

export const addPlan = (plan: Plan): AddPlanAction => ({
    type: ADD_PLAN,
    plan
});

export const deletePlan = (plan: Plan): DeletePlanAction => ({
    type: DELETE_PLAN,
    plan
});

export const modifyPlan = (plan: Plan): ModifyPlanAction => ({
    type: MODIFY_PLAN,
    plan
});
