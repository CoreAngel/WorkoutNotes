import {
    ADD_SUPERSET,
    AddSupersetAction,
    DELETE_SUPERSET,
    DeleteSupersetAction,
    SupersetAction,
    MODIFY_SUPERSET,
    ModifySupersetAction,
    SupersetStore
} from './types';

const initialState: SupersetStore = {
    supersets: [
        {
            id: 0,
            name: 'superset 1',
            desc: 'desc',
            exercises: [
                {
                    exerciseId: 0,
                    order: 0
                },
                {
                    exerciseId: 1,
                    order: 1
                }
            ]
        },
        {
            id: 1,
            name: 'superset 2',
            desc: 'desc',
            exercises: [
                {
                    exerciseId: 1,
                    order: 0
                },
                {
                    exerciseId: 2,
                    order: 1
                }
            ]
        }
    ],
    index: 2
};

const supersetReducer = (state = initialState, action: SupersetAction) => {
    switch (action.type) {
        case ADD_SUPERSET: {
            const addAction = action as AddSupersetAction;
            addAction.superset.id = state.index;
            return {
                ...state,
                supersets: [...state.supersets, addAction.superset],
                index: state.index + 1
            };
        }
        case DELETE_SUPERSET: {
            const deleteAction = action as DeleteSupersetAction;
            return {
                ...state,
                supersets: [...state.supersets.filter(sup => sup.id !== deleteAction.superset.id)]
            };
        }
        case MODIFY_SUPERSET: {
            const modifyAction = action as ModifySupersetAction;
            const supersets = state.supersets.map(item => {
                if (item.id === modifyAction.superset.id) {
                    return modifyAction.superset;
                }
                return item;
            });

            return {
                ...state,
                supersets: [...supersets]
            };
        }
        default:
            return state;
    }
};

export default supersetReducer;
