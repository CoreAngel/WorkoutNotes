import {
    ADD_SUPERSET,
    AddSupersetAction,
    DELETE_SUPERSET,
    DeleteSupersetAction,
    SupersetAction,
    MODIFY_SUPERSET,
    ModifySupersetAction,
    SET_INDEX,
    SetIndexAction,
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
    index: 0
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
            const index = state.supersets.findIndex(item => item.id === modifyAction.superset.id);
            if (index < 0) {
                return state;
            }
            const copySupersets = [...state.supersets];
            copySupersets[index] = modifyAction.superset;
            return {
                ...state,
                supersets: [...copySupersets]
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

export default supersetReducer;
