import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { batch, connect } from 'react-redux';
import Colors from '../utils/Colors';
import { DefaultText } from '../components/DefaultText';
import WorkoutExercise from '../components/WorkoutExercise';
import { Store } from '../redux/store';
import { Workout } from '../redux/workout/types';
import { Exercise } from '../redux/exercise/types';
import { modifyWorkout } from '../redux/workout/workoutActions';
import {
    addWorkoutExerciseAction,
    multiAddWorkoutExerciseAction
} from '../redux/exercise/exerciseActions';
import Editor, { EditorState } from '../components/inputs/Editor';
import DateFormatter from '../utils/DateFormatter';
import {
    getWorkoutExercise,
    getWorkoutExercisesFromWorkout,
    getExercisesFromSupersetToAdd,
    getExerciseToAdd
} from '../selectors';
import Picker, { PickerItem } from '../components/inputs/Picker';
import { Superset } from '../redux/superset/types';
import TextInput from '../components/inputs/TextInput';
import useDebounce from '../hooks/useDebounce';

type Props = {
    exercises: Exercise[];
    supersets: Superset[];
    workout: Workout;
    modifyWorkoutAction: typeof modifyWorkout;
    addWorkoutExercise: typeof addWorkoutExerciseAction;
    multiAddWorkoutExercise: typeof multiAddWorkoutExerciseAction;
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
    workout,
    modifyWorkoutAction,
    addWorkoutExercise,
    multiAddWorkoutExercise,
    exercises,
    supersets
}: Props) => {
    const [nameState, setNameState] = useState(workout.name);
    const debounceName = useDebounce(nameState, 400);
    const [editorVisible, setEditorVisible] = useState(false);
    const [editorState, setEditorState] = useState<EditorState>({
        exerciseId: 0,
        exerciseWorkoutId: 0,
        setIndex: 0
    });
    const resolvedExercises = resolveWorkoutToWorkoutExercisesArray(workout);

    useEffect(() => {
        if (debounceName != null) {
            modifyWorkoutAction({
                ...workout,
                name: debounceName
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceName]);

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
        const { payloadExercise, payloadWorkout } = getExerciseToAdd(workout, exerciseId);
        batch(() => {
            addWorkoutExercise(payloadExercise);
            modifyWorkoutAction(payloadWorkout);
        });
    };

    const addSupersetToWorkout = (supersetId: number) => {
        const { payloadWorkout, payloadsExercise } = getExercisesFromSupersetToAdd(
            workout,
            supersetId
        );
        batch(() => {
            multiAddWorkoutExercise(payloadsExercise);
            modifyWorkoutAction(payloadWorkout);
        });
    };

    const onChangeName = (text: string) => {
        setNameState(text);
    };

    return (
        <ScreenContainer>
            <ScrollViewScreenContainer>
                <DateContainer>
                    <DateButton onPress={() => {}}>
                        <DateText>{DateFormatter(workout.date)}</DateText>
                    </DateButton>
                </DateContainer>
                {workout.planId == null && (
                    <ContainerInputText>
                        <TextInput
                            label="Name"
                            onChangeText={onChangeName}
                            defaultValue={workout.name}
                        />
                    </ContainerInputText>
                )}
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

const ContainerInputText = styled.View`
    padding-top: 30px;
`;

const mapStateToProps = (state: Store) => {
    const { exercise, workout, superset } = state;
    const activeWorkout = workout.workouts.find(item => item.active);

    return {
        workout: activeWorkout,
        exercises: exercise.exercises,
        supersets: superset.supersets
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
