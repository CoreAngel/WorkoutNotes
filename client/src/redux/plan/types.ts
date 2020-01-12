export type PlanExercise = {
    id: number;
    order: number;
};

export type Plan = {
    id?: number;
    name: string;
    desc: string;
    exercises: PlanExercise[];
    supersets: PlanExercise[];
};

export type PlanStore = {
    plans: Plan[];
    index: number;
};

const PREFIX = 'plan';
export const ADD_PLAN = `${PREFIX}/ADD_PLAN`;
export const DELETE_PLAN = `${PREFIX}/DELETE_PLAN`;
export const MODIFY_PLAN = `${PREFIX}/MODIFY_PLAN`;

export interface AddPlanAction {
    type: typeof ADD_PLAN;
    plan: Plan;
}
export interface DeletePlanAction {
    type: typeof DELETE_PLAN;
    plan: Plan;
}

export interface ModifyPlanAction {
    type: typeof MODIFY_PLAN;
    plan: Plan;
}

export type PlanAction = AddPlanAction | DeletePlanAction | ModifyPlanAction;
