export type SupersetExercise = {
    exerciseId: number;
    order: number;
};

export type Superset = {
    id?: number;
    name: string;
    desc: string;
    exercises: SupersetExercise[];
};

export type SupersetStore = {
    supersets: Superset[];
    index: number;
};

const PREFIX = 'superset';
export const ADD_SUPERSET = `${PREFIX}/ADD_SUPERSET`;
export const DELETE_SUPERSET = `${PREFIX}/DELETE_SUPERSET`;
export const MODIFY_SUPERSET = `${PREFIX}/MODIFY_SUPERSET`;
export const SET_INDEX = `${PREFIX}/SET_INDEX`;

export interface AddSupersetAction {
    type: typeof ADD_SUPERSET;
    superset: Superset;
}
export interface DeleteSupersetAction {
    type: typeof DELETE_SUPERSET;
    superset: Superset;
}

export interface ModifySupersetAction {
    type: typeof MODIFY_SUPERSET;
    superset: Superset;
}

export interface SetIndexAction {
    type: typeof SET_INDEX;
    index: number;
}

export type ExerciseAction =
    | AddSupersetAction
    | DeleteSupersetAction
    | ModifySupersetAction
    | SetIndexAction;
