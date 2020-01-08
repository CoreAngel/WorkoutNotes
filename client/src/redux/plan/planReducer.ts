import {
    ADD_PLAN,
    AddPlanAction,
    DELETE_PLAN,
    DeletePlanAction,
    PlanAction,
    MODIFY_PLAN,
    ModifyPlanAction,
    SET_INDEX,
    SetIndexAction,
    PlanStore
} from './types';

const initialState: PlanStore = {
    plans: [],
    index: 0
};

const planReducer = (state = initialState, action: PlanAction) => {
    switch (action.type) {
        case ADD_PLAN: {
            const addAction = action as AddPlanAction;
            addAction.plan.id = state.index;
            return {
                ...state,
                plans: [...state.plans, addAction.plan],
                index: state.index + 1
            };
        }
        case DELETE_PLAN: {
            const deleteAction = action as DeletePlanAction;
            return {
                ...state,
                plans: [...state.plans.filter(sup => sup.id !== deleteAction.plan.id)]
            };
        }
        case MODIFY_PLAN: {
            const modifyAction = action as ModifyPlanAction;
            const index = state.plans.findIndex(item => item.id === modifyAction.plan.id);
            if (index < 0) {
                return state;
            }
            const copyPlans = [...state.plans];
            copyPlans[index] = modifyAction.plan;
            return {
                ...state,
                plans: [...copyPlans]
            };
        }
        case SET_INDEX: {
            const setIndexAction = action as SetIndexAction;
            return {
                ...state,
                index: setIndexAction.index
            };
        }
        default:
            return state;
    }
};

export default planReducer;
