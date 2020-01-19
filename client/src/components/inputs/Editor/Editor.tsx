import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Colors from '../../../utils/Colors';
import { DefaultText } from '../../DefaultText';
import { CloseIcon } from '../../icons';
import NumberInput from '../NumberInput';
import EditorContainer from './EditorContainer';
import Button from '../../buttons/Button';
import store from '../../../redux/store';
import {
    modifyWorkoutExerciseSetAction,
    deleteWorkoutExerciseSetAction
} from '../../../redux/exercise/exerciseActions';
import { WorkoutExerciseSetPayload } from '../../../redux/exercise/types';

export type EditorState = {
    exerciseId: number;
    exerciseWorkoutId: number;
    setIndex: number;
    supersetId?: number;
};

type Props = {
    state: EditorState;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    modifyWorkoutExerciseSet: typeof modifyWorkoutExerciseSetAction;
    deleteWorkoutExerciseSet: typeof deleteWorkoutExerciseSetAction;
};

const getData = state => {
    const { exercise, superset, workout } = store.getState();
    const blankData = {
        previousWorkout: null,
        exercise: null,
        supersetName: '',
        workout: null
    };

    if (state === null) {
        return blankData;
    }

    let supersetName = '';
    if (state.supersetId !== undefined) {
        const foundSuperset = superset.supersets.find(item => item.id === state.supersetId);
        supersetName = foundSuperset ? foundSuperset.name : '';
    }

    const foundExercise = exercise.exercises.find(item => item.id === state.exerciseId);
    if (!foundExercise) {
        return blankData;
    }
    const foundWorkout = foundExercise.workouts.find(item => item.id === state.exerciseWorkoutId);
    const previousWorkout = foundExercise.workouts.reduce(
        (last, acc) => {
            if (last.workout == null) {
                const accWorkout = workout.workouts.find(
                    item => item.id === acc.workoutId && item.finished
                );
                return {
                    exercise: acc,
                    workout: accWorkout
                };
            }

            const accWorkout = workout.workouts.find(
                item => item.id === acc.workoutId && item.finished
            );
            if (Date.parse(last.workout.date) < Date.parse(accWorkout.date)) {
                return {
                    exercise: acc,
                    workout: accWorkout
                };
            }
            return last;
        },
        {
            exercise: null,
            workout: null
        }
    );

    return {
        workout: foundWorkout,
        exercise: foundExercise,
        previousWorkout: previousWorkout.workout ? previousWorkout.exercise : null,
        supersetName
    };
};

const Editor: FC<Props> = ({
    state,
    visible,
    setVisible,
    deleteWorkoutExerciseSet,
    modifyWorkoutExerciseSet
}: Props) => {
    const [close, setClose] = useState(visible);
    const [dataState, setDataState] = useState(null);
    const [setState, setSetState] = useState(null);

    useEffect(() => {
        setClose(visible);
    }, [visible]);

    useEffect(() => {
        const data = getData(state);
        setDataState(data);
    }, [state]);

    useEffect(() => {
        const activeSet = !dataState
            ? null
            : dataState.workout.sets.find(item => item.index === state.setIndex);
        setSetState(activeSet);
    }, [state, dataState]);

    const weightUnit = (() => {
        const { option } = store.getState();
        return option.weightUnits.filter(item => item.selected).pop();
    })();

    const previousString =
        !dataState || !dataState.previousWorkout
            ? '-'
            : dataState.previousWorkout.sets
                  .map(item => {
                      const { weight, reps } = item.achieved;

                      const weightStr = `${weight * weightUnit.converter}${weightUnit.unit}`;
                      return `${weightStr}x${reps}`;
                  })
                  .join(', ');

    const onSave = () => {
        const payload: WorkoutExerciseSetPayload = {
            workoutId: dataState.workout.id,
            exerciseId: dataState.exercise.id,
            set: setState
        };
        modifyWorkoutExerciseSet(payload);
        setClose(false);
    };

    const onDelete = () => {
        const payload: WorkoutExerciseSetPayload = {
            workoutId: dataState.workout.id,
            exerciseId: dataState.exercise.id,
            set: setState
        };
        deleteWorkoutExerciseSet(payload);
        setClose(false);
    };

    return (
        <EditorContainer visible={visible} close={close} setVisible={setVisible}>
            {!state || !dataState || !setState ? null : (
                <Container>
                    <CloseIconContainer>
                        <CloseIconButton
                            onPress={() => {
                                setClose(false);
                            }}
                        >
                            <View>
                                <CloseIcon height="25px" width="25px" />
                            </View>
                        </CloseIconButton>
                    </CloseIconContainer>
                    <TitleContainer>
                        <Title>{dataState.exercise.name}</Title>
                        <Subtitle>{`Set ${state.setIndex + 1}`}</Subtitle>
                    </TitleContainer>
                    <Previous>{`Previous: ${previousString}`}</Previous>
                    <TableContainer>
                        <Row>
                            <RowTitle />
                            <ColumnTitle>Weight</ColumnTitle>
                            <ColumnTitle>Reps</ColumnTitle>
                        </Row>
                        <Row>
                            <RowTitle>Goal</RowTitle>
                            <ColumnData>
                                <NumberInput
                                    fixedNumbersAfterDot={2}
                                    defaultValue={setState.goal.weight}
                                    onChange={number => {
                                        setSetState({
                                            ...setState,
                                            goal: {
                                                ...setState.goal,
                                                weight: number
                                            }
                                        });
                                    }}
                                />
                            </ColumnData>
                            <ColumnData>
                                <NumberInput
                                    fixedNumbersAfterDot={0}
                                    defaultValue={setState.goal.reps}
                                    onChange={number => {
                                        setSetState({
                                            ...setState,
                                            goal: {
                                                ...setState.goal,
                                                reps: number
                                            }
                                        });
                                    }}
                                />
                            </ColumnData>
                        </Row>
                        <Row>
                            <RowTitle>Achieved</RowTitle>
                            <ColumnData>
                                <NumberInput
                                    fixedNumbersAfterDot={2}
                                    defaultValue={setState.achieved.weight}
                                    onChange={number => {
                                        setSetState({
                                            ...setState,
                                            achieved: {
                                                ...setState.achieved,
                                                weight: number
                                            }
                                        });
                                    }}
                                />
                            </ColumnData>
                            <ColumnData>
                                <NumberInput
                                    fixedNumbersAfterDot={0}
                                    defaultValue={setState.achieved.reps}
                                    onChange={number => {
                                        setSetState({
                                            ...setState,
                                            achieved: {
                                                ...setState.achieved,
                                                reps: number
                                            }
                                        });
                                    }}
                                />
                            </ColumnData>
                        </Row>
                    </TableContainer>
                    <ButtonsContainer>
                        <Button color={Colors.RED} label="Delete" onClick={onDelete} />
                        <Button label="Save" onClick={onSave} />
                    </ButtonsContainer>
                </Container>
            )}
        </EditorContainer>
    );
};

const Container = styled.View`
    position: relative;
    background-color: ${Colors.SECONDARY};
    padding: 15px 20px;
`;

const TitleContainer = styled.View`
    flex-direction: row;
`;

const Title = styled(DefaultText)`
    color: ${Colors.WHITE};
`;

const Subtitle = styled(DefaultText)`
    color: ${Colors.WHITE70};
    margin-left: 20px;
`;

const CloseIconContainer = styled.View`
    position: absolute;
    top: 15px;
    right: 20px;
`;
const CloseIconButton = styled.TouchableWithoutFeedback``;

const Previous = styled(DefaultText)`
    color: ${Colors.WHITE70};
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 10px;
`;

const TableContainer = styled.View`
    padding: 10px 0;
`;

const Row = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 5px 0;
`;

const RowTitle = styled(DefaultText)`
    color: ${Colors.WHITE};
    width: 80px;
`;

const ColumnTitle = styled(DefaultText)`
    color: ${Colors.WHITE70};
    text-align: center;
    flex: 1;
`;

const ColumnData = styled.View`
    flex: 1;
`;

const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-top: 20px;
`;

const mapDispatchToProps = {
    modifyWorkoutExerciseSet: modifyWorkoutExerciseSetAction,
    deleteWorkoutExerciseSet: deleteWorkoutExerciseSetAction
};

export default connect(
    null,
    mapDispatchToProps
)(Editor);
