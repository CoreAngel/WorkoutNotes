import {
    OptionsStore,
    CHANGE_WEIGHT_UNIT,
    ChangeWeightUnitAction,
    OptionsAction,
    Weight,
    SET_AUTH_TOKEN,
    SetAuthTokenAction,
    CLEAR_AUTH_TOKEN
} from './types';

const initialState: OptionsStore = {
    weightUnits: [
        {
            unit: Weight.KG,
            name: 'kilograms',
            converter: 1,
            selected: true
        },
        {
            unit: Weight.LB,
            name: 'pounds',
            converter: 2.20462262,
            selected: false
        }
    ],
    token: null
};

const optionsReducer = (state = initialState, action: OptionsAction) => {
    switch (action.type) {
        case CHANGE_WEIGHT_UNIT: {
            const changeAction = action as ChangeWeightUnitAction;
            const { unit } = changeAction;

            const weightUnits = state.weightUnits.map(item => {
                return {
                    ...item,
                    selected: item.unit === unit
                };
            });

            return {
                ...state,
                weightUnits
            };
        }
        case SET_AUTH_TOKEN: {
            const setTokenAction = action as SetAuthTokenAction;
            const { token } = setTokenAction;
            return {
                ...state,
                token
            };
        }
        case CLEAR_AUTH_TOKEN: {
            return {
                ...state,
                token: null
            };
        }
        default:
            return state;
    }
};

export default optionsReducer;
