import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { NavigationStackProp } from 'react-navigation-stack';
import Colors from '../utils/Colors';
import { DefaultText } from '../components/DefaultText';
import Picker, { PickerItem } from '../components/inputs/Picker';
import TextInput from '../components/inputs/TextInput';
import ExerciseItemList from '../components/ExerciseItemList';
import Button from '../components/buttons/Button';
import ScrollContainerWithAutoScroll from '../components/ScrollContainerWithAutoScroll';
import { Store as GlobalStore } from '../redux/store';
import { addSuperset, modifySuperset } from '../redux/superset/supersetActions';
import { Exercise } from '../redux/exercise/types';
import { Superset, SupersetExercise } from '../redux/superset/types';

type Props = {
    navigation: NavigationStackProp<{ superset: Superset | null }>;
    exercises: Exercise[];
    addSupersetAction: typeof addSuperset;
    modifySupersetAction: typeof modifySuperset;
};

type State = {
    id?: number;
    name: string;
    desc: string;
    exercises: Exercise[];
};

const CreateSuperset: FC<Props> = ({
    exercises,
    addSupersetAction,
    modifySupersetAction,
    navigation
}: Props) => {
    const setInitialState = () => {
        const { superset } = navigation.state.params;
        if (superset !== null) {
            const { desc, name, id } = superset;
            return {
                id,
                name,
                desc,
                exercises: []
            };
        }
        return {
            name: '',
            desc: '',
            exercises: []
        };
    };
    const [state, setState] = useState<State>(setInitialState());

    useEffect(() => {
        const { superset } = navigation.state.params;
        if (!superset || superset.id == null) {
            return;
        }

        const supersetTyped = superset as Superset;

        const exercisesInPlan = exercises.filter(item => {
            return supersetTyped.exercises.some(someItem => someItem.exerciseId === item.id);
        });

        const finalExercises = supersetTyped.exercises
            .map(item => {
                const { exerciseId, order } = item;
                return {
                    exercise: exercisesInPlan.find(itemInPlan => itemInPlan.id === exerciseId),
                    order
                };
            })
            .sort((i1, i2) => i1.order - i2.order)
            .map(item => item.exercise);

        setState({
            ...state,
            exercises: finalExercises
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const listItems: PickerItem[] = exercises.map(
        (item): PickerItem => {
            return {
                value: item.id.toString(),
                label: item.name
            };
        }
    );

    const onChangeName = (text: string) => {
        setState({
            ...state,
            name: text
        });
    };

    const onChangeDesc = (text: string) => {
        setState({
            ...state,
            desc: text
        });
    };

    const onChange = (pickerItem: PickerItem) => {
        const exercise = exercises.find(item => item.id.toString() === pickerItem.value);
        if (exercise) {
            setState({
                ...state,
                exercises: [...state.exercises, exercise]
            });
        }
    };

    const swapExercises = (i1: number, i2: number) => {
        const copyExercises = cloneDeep(state.exercises);
        const temp = copyExercises[i1];
        copyExercises[i1] = copyExercises[i2];
        copyExercises[i2] = temp;
        setState({
            ...state,
            exercises: copyExercises
        });
    };

    const onUp = (index: number) => {
        if (index <= 0) {
            return;
        }
        swapExercises(index, index - 1);
    };

    const onDown = (index: number) => {
        if (index >= state.exercises.length - 1) {
            return;
        }
        swapExercises(index, index + 1);
    };

    const onDelete = (index: number) => {
        if (index >= 0 && index < state.exercises.length) {
            const copyExercises = cloneDeep(state.exercises);
            copyExercises.splice(index, 1);
            setState({
                ...state,
                exercises: copyExercises
            });
        }
    };

    const saveSuperset = () => {
        const { id, desc, name } = state;
        const superset: Superset = {
            id,
            name,
            desc,
            exercises: state.exercises.map(
                (item, index): SupersetExercise => {
                    return {
                        exerciseId: item.id,
                        order: index
                    };
                }
            )
        };

        if (id == null) {
            addSupersetAction(superset);
        } else {
            modifySupersetAction(superset);
        }
    };

    const absoluteSaveButton = (
        <SaveButtonContainer>
            <Button label="Save" onClick={saveSuperset} />
        </SaveButtonContainer>
    );

    return (
        <ScrollContainerWithAutoScroll absoluteChild={absoluteSaveButton}>
            <TextInputContainer>
                <TextInput onChangeText={onChangeName} label="Name" defaultValue={state.name} />
            </TextInputContainer>
            <TextInputContainer>
                <TextInput
                    onChangeText={onChangeDesc}
                    label="Description"
                    defaultValue={state.desc}
                />
            </TextInputContainer>
            <ExercisesLabel>Exercises</ExercisesLabel>
            <ExercisesContainer>
                <FlatList
                    data={state.exercises}
                    renderItem={({ item, index }) => {
                        return (
                            <ExerciseItemList
                                index={index}
                                name={item.name}
                                onUp={onUp}
                                onDown={onDown}
                                onDelete={onDelete}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => `${item.id}/${index}`}
                />
                <AddItemContainer>
                    <Picker items={listItems} onChange={onChange} />
                </AddItemContainer>
            </ExercisesContainer>
        </ScrollContainerWithAutoScroll>
    );
};

const TextInputContainer = styled.View`
    margin-bottom: 20px;
`;

const ExercisesLabel = styled(DefaultText)`
    color: ${Colors.WHITE70};
    margin-top: 30px;
`;

const ExercisesContainer = styled.View`
    padding-left: 30px;
`;

const AddItemContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 8px;
    margin-bottom: 8px;
`;

const SaveButtonContainer = styled.View`
    position: absolute;
    bottom: 20px;
    right: 20px;
`;

const mapStateToProps = (state: GlobalStore) => {
    const { exercise } = state;
    return { exercises: exercise.exercises };
};

const mapDispatchToProps = {
    addSupersetAction: addSuperset,
    modifySupersetAction: modifySuperset
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateSuperset);
