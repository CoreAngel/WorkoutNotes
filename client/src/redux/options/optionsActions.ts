import { CHANGE_WEIGHT_UNIT, ChangeWeightUnitAction, Weight } from './types';

const changeWeightUnit = (unit: Weight): ChangeWeightUnitAction => ({
    type: CHANGE_WEIGHT_UNIT,
    unit
});

export default changeWeightUnit;
