export enum Weight {
    KG = 'kg',
    LB = 'lb'
}

export type WeightUnit = {
    unit: Weight;
    name: string;
    converter: number;
    selected: boolean;
};

export type OptionsStore = {
    weightUnits: WeightUnit[];
    token: string | null;
};

const PREFIX = 'options';
export const CHANGE_WEIGHT_UNIT = `${PREFIX}/CHANGE_WEIGHT_UNIT`;
export const SET_AUTH_TOKEN = `${PREFIX}/SET_AUTH_TOKEN`;
export const CLEAR_AUTH_TOKEN = `${PREFIX}/CLEAR_AUTH_TOKEN`;

export interface ChangeWeightUnitAction {
    type: typeof CHANGE_WEIGHT_UNIT;
    unit: Weight;
}

export interface SetAuthTokenAction {
    type: typeof SET_AUTH_TOKEN;
    token: string;
}

export interface ClearAuthTokenAction {
    type: typeof CLEAR_AUTH_TOKEN;
}

export type OptionsAction = ChangeWeightUnitAction | SetAuthTokenAction | ClearAuthTokenAction;
