import React, { FC } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { DefaultText } from '../DefaultText';
import Colors from '../../utils/Colors';
import { EditIcon } from '../icons';
import { Store } from '../../redux/store';
import { WeightUnit } from '../../redux/options/types';
import { EditorState } from '../inputs/Editor';

export type Set = {
    weight: number;
    reps: number;
};

export type WorkoutExerciseItemType = {
    index: number;
    id?: number;
    goal: Set | null;
    achieved: Set;
};

export type Item = {
    exerciseId: number;
    supersetId?: number;
    exerciseWorkoutId: number;
    index: number;
    workoutItem: WorkoutExerciseItemType;
};

type Props = {
    item: Item;
    weightUnit: WeightUnit;
    setEditorState: (state: EditorState) => void;
};

const WorkoutExerciseItem: FC<Props> = ({ item, weightUnit, setEditorState }: Props) => {
    const { exerciseId, exerciseWorkoutId, supersetId, workoutItem } = item;
    const { index, achieved, goal } = workoutItem;

    const goalWeight = +(goal.weight * weightUnit.converter).toFixed(2);
    const achievedWeight = +(achieved.weight * weightUnit.converter).toFixed(2);

    const editData = () => {
        const state: EditorState = {
            exerciseId,
            setIndex: index,
            exerciseWorkoutId,
            supersetId
        };
        setEditorState(state);
    };

    return (
        <Container>
            <SetContainer>{index + 1}</SetContainer>
            <ResultContainer>{`${goalWeight}${weightUnit.unit} x ${goal.reps}`}</ResultContainer>
            <ResultContainer>{`${achievedWeight}${weightUnit.unit} x ${
                achieved.reps
            }`}</ResultContainer>
            <EditContainer>
                <EditIcon onClick={editData} />
            </EditContainer>
        </Container>
    );
};

const Container = styled.View`
    flex-direction: row;
    margin: 2px 0;
    width: 100%;
`;

const SetContainer = styled(DefaultText)`
    width: 30px;
    margin-right: 10px;
    color: ${Colors.WHITE70};
    text-align: center;
`;

const ResultContainer = styled(DefaultText)`
    width: 110px;
    color: ${Colors.WHITE70};
    text-align: center;
`;

const EditContainer = styled.View`
    margin-left: auto;
    margin-right: 5px;
`;

const mapStateToProps = (state: Store) => {
    const { option } = state;
    const activeWeightUnit = option.weightUnits.find(item => item.selected);
    return {
        weightUnit: activeWeightUnit
    };
};

export default connect(mapStateToProps)(WorkoutExerciseItem);
