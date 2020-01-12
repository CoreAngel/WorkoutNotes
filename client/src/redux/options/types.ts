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
};

const PREFIX = 'options';
export const CHANGE_WEIGHT_UNIT = `${PREFIX}/CHANGE_WEIGHT_UNIT`;

export interface ChangeWeightUnitAction {
    type: typeof CHANGE_WEIGHT_UNIT;
    unit: Weight;
}

export type OptionsAction = ChangeWeightUnitAction;
