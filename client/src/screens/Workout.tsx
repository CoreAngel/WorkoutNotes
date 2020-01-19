import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { batch, connect } from 'react-redux';
import Colors from '../utils/Colors';
import { DefaultText } from '../components/DefaultText';
import WorkoutExercise from '../components/WorkoutExercise';
import store, { Store } from '../redux/store';
import { Workout } from '../redux/workout/types';
import { Exercise, WorkoutExercisePayload } from '../redux/exercise/types';
import { modifyWorkout } from '../redux/workout/workoutActions';
import {
    addWorkoutExerciseAction,
    multiAddWorkoutExerciseAction
} from '../redux/exercise/exerciseActions';
import Editor, { EditorState } from '../components/inputs/Editor';
import DateFormatter from '../utils/DateFormatter';
import { getWorkoutExercise, getWorkoutExercisesFromWorkout } from '../selectors';
import Picker, { PickerItem } from '../components/inputs/Picker';
import { Superset } from '../redux/superset/types';

type WorkoutIndexMapItem = {
    exerciseId: number;
    index: number;
};

type Props = {
    indexes: {
        workoutExercisesIndexMap: WorkoutIndexMapItem[];
        workoutIndex: number;
    };
    exercises: Exercise[];
    supersets: Superset[];
    workout: Workout;
    modifyWorkoutAction: typeof modifyWorkout;
    addWorkoutExercise: typeof addWorkoutExerciseAction;
    multiAddWorkoutExercise: typeof multiAddWorkoutExerciseAction;
};

const devSelectWorkout = () => {
    return store.getState().workout.workouts[0];
};

const resolveWorkoutToWorkoutExercisesArray = (workout: Workout) => {
    const workoutExercises = getWorkoutExercisesFromWorkout(workout);
    return workoutExercises
        .map(item => getWorkoutExercise(item))
        .filter(item => item !== null)
        .sort((i1, i2) => i1.order - i2.order)
        .map((item, index) => ({
            ...item,
            order: index
        }));
};

const WorkoutScreen: FC<Props> = ({
    indexes,
    workout = devSelectWorkout(),
    modifyWorkoutAction,
    addWorkoutExercise,
    multiAddWorkoutExercise,
    exercises,
    supersets
}: Props) => {
    const [editorVisible, setEditorVisible] = useState(false);
    const [editorState, setEditorState] = useState<EditorState>({
        exerciseId: 0,
        exerciseWorkoutId: 0,
        setIndex: 0
    });
    const resolvedExercises = resolveWorkoutToWorkoutExercisesArray(workout);

    const setEditor = (state: EditorState) => {
        setEditorState(state);
        setEditorVisible(true);
    };

    const mapExercisesToPickerItem: PickerItem[] = exercises.map(item => {
        return {
            label: item.name,
            value: item.id.toString()
        };
    });

    const mapSupersetsToPickerItem: PickerItem[] = supersets.map(item => {
        return {
            label: item.name,
            value: item.id.toString()
        };
    });

    const addExerciseToWorkout = (exerciseId: number) => {
        const exercise = store.getState().exercise.exercises.find(item => item.id === exerciseId);
        if (!exercise) {
            return;
        }

        const exerciseWorkoutId = indexes.workoutExercisesIndexMap.find(
            item => item.exerciseId === exerciseId
        ).index;
        const payloadExercise: WorkoutExercisePayload = {
            exerciseId,
            workout: {
                id: exerciseWorkoutId,
                setIndex: 0,
                sets: [],
                workoutId: workout.id
            }
        };

        const payloadWorkout: Workout = {
            ...workout,
            exercises: [
                ...workout.exercises,
                {
                    exerciseId,
                    exerciseWorkoutId,
                    order: workout.exercises.length + workout.supersets.length
                }
            ]
        };

        batch(() => {
            addWorkoutExercise(payloadExercise);
            modifyWorkoutAction(payloadWorkout);
        });
    };

    const addSupersetToWorkout = (supersetId: number) => {
        const superset = store.getState().superset.supersets.find(item => item.id === supersetId);
        if (!superset) {
            return;
        }

        const exercisesArr = superset.exercises.map(item => {
            return {
                order: item.order,
                exercise: store
                    .getState()
                    .exercise.exercises.find(exItem => exItem.id === item.exerciseId)
            };
        });

        let exerciseWorkoutIdMap = indexes.workoutExercisesIndexMap;
        const payloadsExercise = exercisesArr
            .sort((i1, i2) => i1.order - i2.order)
            .map(item => {
                const { id } = item.exercise;

                const exerciseWorkoutId = exerciseWorkoutIdMap.find(
                    indItem => indItem.exerciseId === id
                ).index;
                const payloadExercise = {
                    exerciseId: id,
                    workout: {
                        id: exerciseWorkoutId,
                        setIndex: 0,
                        sets: [],
                        workoutId: workout.id
                    }
                };

                exerciseWorkoutIdMap = exerciseWorkoutIdMap.map(indItem => {
                    if (indItem.exerciseId === id) {
                        return {
                            ...indItem,
                            index: indItem.index + 1
                        };
                    }
                    return indItem;
                });

                return payloadExercise;
            });

        const payloadWorkout: Workout = {
            ...workout,
            supersets: [
                ...workout.supersets,
                {
                    supersetId: superset.id,
                    exercises: [
                        ...payloadsExercise.map((item, index) => {
                            return {
                                order: index,
                                exerciseId: item.exerciseId,
                                exerciseWorkoutId: item.workout.id
                            };
                        })
                    ],
                    order: workout.exercises.length + workout.supersets.length
                }
            ]
        };

        batch(() => {
            multiAddWorkoutExercise(payloadsExercise);
            modifyWorkoutAction(payloadWorkout);
        });
    };

    return (
        <ScreenContainer>
            <ScrollViewScreenContainer>
                <DateContainer>
                    <DateButton onPress={() => {}}>
                        <DateText>{DateFormatter(workout.date)}</DateText>
                    </DateButton>
                </DateContainer>
                <Header>Achievement</Header>
                <Container>
                    <Achievement>Bench Press - 120kgx8 - total in series 960kg</Achievement>
                </Container>
                <Header>Workout</Header>
                <Container>
                    <ExercisesContainer>
                        {resolvedExercises.map(item => {
                            const {
                                exerciseId,
                                id,
                                exerciseName,
                                workoutId,
                                sets,
                                supersetName,
                                supersetId
                            } = item;
                            const key = `${supersetId}/${exerciseId}/${workoutId}/${id}`;
                            return (
                                <WorkoutExercise
                                    key={key}
                                    exercise={{
                                        title: exerciseName,
                                        items: sets,
                                        exerciseId,
                                        supersetId,
                                        supersetName,
                                        exerciseWorkoutId: id
                                    }}
                                    setEditorState={setEditor}
                                />
                            );
                        })}
                    </ExercisesContainer>
                    <AddOptions>
                        <OptionContainer>
                            <Picker
                                items={mapExercisesToPickerItem}
                                onChange={item =>
                                    addExerciseToWorkout(Number.parseInt(item.value, 10))
                                }
                                label="Exercise"
                            />
                        </OptionContainer>
                        <OptionContainer>
                            <Picker
                                items={mapSupersetsToPickerItem}
                                onChange={item =>
                                    addSupersetToWorkout(Number.parseInt(item.value, 10))
                                }
                                label="Superset"
                            />
                        </OptionContainer>
                    </AddOptions>
                </Container>
            </ScrollViewScreenContainer>
            <Editor state={editorState} visible={editorVisible} setVisible={setEditorVisible} />
        </ScreenContainer>
    );
};

const ScreenContainer = styled.View`
    flex: 1;
`;

const ScrollViewScreenContainer = styled.ScrollView`
    flex-grow: 1;
    padding: 0 20px;
    position: relative;
`;

const Header = styled(DefaultText)`
    color: ${Colors.PRIMARY};
    font-weight: bold;
    font-size: 14px;
    margin: 20px 0;
`;

const DateContainer = styled.View`
    border-color: ${Colors.PRIMARY};
    border-width: 1px;
    padding: 2px 15px;
    border-radius: 5px;
    position: absolute;
    top: 20px;
    right: 0;
`;

const DateButton = styled.TouchableWithoutFeedback``;

const DateText = styled(DefaultText)`
    color: ${Colors.WHITE70};
`;

const Container = styled.View`
    background-color: ${Colors.SECONDARY};
    padding: 20px 15px;
`;

const Achievement = styled(DefaultText)`
    color: ${Colors.WHITE70};
`;

const ExercisesContainer = styled.View`
    margin-bottom: 10px;
`;

const AddOptions = styled.View`
    flex-direction: row;
    align-items: center;
`;

const OptionContainer = styled.View`
    margin-right: 15px;
`;

const mapStateToProps = (state: Store) => {
    const { exercise, workout, superset } = state;

    const workoutExercisesIndexMap: WorkoutIndexMapItem[] = exercise.exercises.map(item => {
        const { id, index } = item;
        return {
            exerciseId: id,
            index
        };
    });

    return {
        exercises: exercise.exercises,
        supersets: superset.supersets,
        indexes: {
            workoutIndex: workout.index,
            workoutExercisesIndexMap
        }
    };
};

const mapDispatchToProps = {
    modifyWorkoutAction: modifyWorkout,
    addWorkoutExercise: addWorkoutExerciseAction,
    multiAddWorkoutExercise: multiAddWorkoutExerciseAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkoutScreen);
