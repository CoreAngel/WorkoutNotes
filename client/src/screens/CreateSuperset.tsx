import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import Colors from '../utils/Colors';
import { DefaultText } from '../components/DefaultText';
import Picker, { PickerItem } from '../components/inputs/Picker';
import TextInput from '../components/inputs/TextInput';
import ExerciseItemList from '../components/ExerciseItemList';
import Button from '../components/buttons/Button';
import { Store as GlobalStore } from '../redux/store';
import { addSuperset } from '../redux/superset/supersetActions';
import { Exercise } from '../redux/exercise/types';
import { Superset, SupersetExercise } from '../redux/superset/types';

type Props = {
    exercises: Exercise[];
    addSupersetAction: typeof addSuperset;
};

type State = {
    name: string;
    desc: string;
    exercises: Exercise[];
};

const CreateSuperset: FC<Props> = ({ exercises, addSupersetAction }: Props) => {
    const [state, setState] = useState<State>({
        name: '',
        desc: '',
        exercises: []
    });

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
        const superset: Superset = {
            name: state.name,
            desc: state.desc,
            exercises: state.exercises.map(
                (item, index): SupersetExercise => {
                    return {
                        exerciseId: item.id,
                        order: index
                    };
                }
            )
        };
        addSupersetAction(superset);
    };

    return (
        <Container>
            <TextInputContainer>
                <TextInput onChangeText={onChangeName} label="Name" />
            </TextInputContainer>
            <TextInputContainer>
                <TextInput onChangeText={onChangeDesc} label="Description" />
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
            <SaveButtonContainer>
                <Button label="Save" onClick={saveSuperset} />
            </SaveButtonContainer>
        </Container>
    );
};

const Container = styled.View`
    margin: 30px 20px;
    padding: 20px;
    background-color: ${Colors.SECONDARY};
    flex: 1;
`;

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
    margin-top: auto;
    margin-left: auto;
`;

const mapStateToProps = (state: GlobalStore) => {
    const { exercise } = state;
    return { exercises: exercise.exercises };
};

const mapDispatchToProps = {
    addSupersetAction: addSuperset
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateSuperset);
