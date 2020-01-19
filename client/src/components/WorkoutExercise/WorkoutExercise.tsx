import React, { FC } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { DefaultText } from '../DefaultText';
import Colors from '../../utils/Colors';
import WorkoutExerciseItem, { WorkoutExerciseItemType } from './WorkoutExerciseItem';
import WorkoutExerciseItemHeader from './WorkoutExerciseItemHeader';
import { AddSmallIcon } from '../icons';
import { EditorState } from '../inputs/Editor';
import { addWorkoutExerciseSetAction } from '../../redux/exercise/exerciseActions';
import { WorkoutExerciseSetPayload } from '../../redux/exercise/types';

export type WorkoutExerciseType = {
    title: string;
    exerciseId: number;
    supersetName?: string;
    supersetId?: number;
    exerciseWorkoutId: number;
    items: WorkoutExerciseItemType[];
};

type Props = {
    exercise: WorkoutExerciseType;
    setEditorState: (state: EditorState) => void;
    addWorkoutExerciseSet: typeof addWorkoutExerciseSetAction;
};

const WorkoutExercise: FC<Props> = ({ exercise, setEditorState, addWorkoutExerciseSet }: Props) => {
    const { title, items, exerciseWorkoutId, exerciseId, supersetName, supersetId } = exercise;
    const sortedItems = items.sort((i1, i2) => i1.index - i2.index);

    const addSet = () => {
        const payload: WorkoutExerciseSetPayload = {
            exerciseId,
            workoutId: exerciseWorkoutId,
            set: {
                index: sortedItems.length,
                achieved: {
                    reps: 0,
                    weight: 0
                },
                goal: {
                    reps: 0,
                    weight: 0
                }
            }
        };
        addWorkoutExerciseSet(payload);
    };

    return (
        <Container>
            <TitleContainer>
                <Title>{title}</Title>
                {supersetName !== undefined ? <Superset>{supersetName}</Superset> : null}
            </TitleContainer>
            <ContainerItems>
                {sortedItems.length > 0 ? <WorkoutExerciseItemHeader /> : null}
                {sortedItems.map((item, index) => {
                    return (
                        <WorkoutExerciseItem
                            key={item.id}
                            item={{
                                workoutItem: item,
                                supersetId,
                                index,
                                exerciseWorkoutId,
                                exerciseId
                            }}
                            setEditorState={setEditorState}
                        />
                    );
                })}
            </ContainerItems>
            <AddIconContainer>
                <AddSmallIcon onClick={addSet} />
            </AddIconContainer>
        </Container>
    );
};

const Container = styled.View`
    margin-bottom: 40px;
`;

const TitleContainer = styled.View`
    flex-direction: row;
    align-items: flex-end;
`;

const Title = styled(DefaultText)`
    color: ${Colors.WHITE};
`;

const Superset = styled(DefaultText)`
    color: ${Colors.WHITE70};
    font-size: 14px;
    margin-left: 10px;
`;

const ContainerItems = styled.View`
    margin-top: 10px;
`;

const AddIconContainer = styled.View`
    margin-top: 10px;
    margin-left: auto;
`;

const mapDispatchToProps = {
    addWorkoutExerciseSet: addWorkoutExerciseSetAction
};

export default connect(
    null,
    mapDispatchToProps
)(WorkoutExercise);
