import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import Colors from '../utils/Colors';
import { DefaultText } from '../components/DefaultText';
import ScrollContainer from '../components/ScrollContainer';
import TextInput from '../components/inputs/TextInput';
import PickerSection, { PickerItem, PickerSectionItem } from '../components/inputs/PickerSection';
import ExerciseItemList from '../components/ExerciseItemList';
import SupersetItemList from '../components/SupersetItemList';
import Button from '../components/buttons/Button';
import { Store as GlobalStore } from '../redux/store';
import { addPlan } from '../redux/plan/planActions';
import { Superset } from '../redux/superset/types';
import { Exercise } from '../redux/exercise/types';
import resolveSuperset from '../redux/resolver';

type Props = {
    exercises: Exercise[];
    supersets: Superset[];
    addPlanAction: typeof addPlan;
};

enum Type {
    EXERCISE,
    SUPERSET
}

type StateExercise = {
    id: number;
    name: string;
    type: Type;
};

type StateSuperset = StateExercise & {
    exercises: string[];
};

type State = {
    name: string;
    desc: string;
    exercises: StateExercise[];
};

const CreatePlan: FC<Props> = ({ exercises, supersets, addPlanAction }: Props) => {
    const [state, setState] = useState<State>({
        name: '',
        desc: '',
        exercises: []
    });

    const addExercise = (item: PickerItem) => {
        const exercise: StateExercise = {
            id: Number.parseInt(item.value, 10),
            name: item.label,
            type: Type.EXERCISE
        };

        setState({
            ...state,
            exercises: [...state.exercises, exercise]
        });
    };
    const addSuperset = (item: PickerItem) => {
        const supersetId = Number.parseInt(item.value, 10);
        const foundSuperset = supersets.find(({ id }) => id === supersetId);
        if (!foundSuperset) {
            return;
        }
        const resolverSuperset = resolveSuperset(foundSuperset);
        const exercisesNames = resolverSuperset.exercises
            .sort((i1, i2) => i1.order - i2.order)
            .map(it => it.exercise.name);

        const superset: StateSuperset = {
            id: supersetId,
            name: item.label,
            type: Type.SUPERSET,
            exercises: exercisesNames
        };
        setState({
            ...state,
            exercises: [...state.exercises, superset]
        });
    };

    const items: PickerSectionItem[] = [];

    if (supersets.length) {
        const listSupersets = supersets.map(
            (item): PickerItem => {
                return {
                    value: item.id.toString(),
                    label: item.name
                };
            }
        );

        items.push({
            title: 'Supersets',
            onClick: addSuperset,
            data: listSupersets
        });
    }

    if (exercises.length) {
        const listExercises = exercises.map(
            (item): PickerItem => {
                return {
                    value: item.id.toString(),
                    label: item.name
                };
            }
        );

        items.push({
            title: 'Exercises',
            onClick: addExercise,
            data: listExercises
        });
    }

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

    const savePlan = () => {
        const planExercises = state.exercises
            .map((item, index) => {
                return {
                    ...item,
                    order: index
                };
            })
            .filter(item => item.type === Type.EXERCISE)
            .map(item => {
                return {
                    id: item.id,
                    order: item.order
                };
            });

        const planSupersets = state.exercises
            .map((item, index) => {
                return {
                    ...item,
                    order: index
                };
            })
            .filter(item => item.type === Type.SUPERSET)
            .map(item => {
                return {
                    id: item.id,
                    order: item.order
                };
            });

        addPlanAction({
            name: state.name,
            desc: state.desc,
            exercises: planExercises,
            supersets: planSupersets
        });
    };

    const absoluteSaveButton = (
        <SaveButtonContainer>
            <Button label="Save" onClick={savePlan} />
        </SaveButtonContainer>
    );

    return (
        <ScrollContainer absoluteChild={absoluteSaveButton}>
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
                        return item.type === Type.EXERCISE ? (
                            <ExerciseItemList
                                index={index}
                                name={item.name}
                                onUp={onUp}
                                onDown={onDown}
                                onDelete={onDelete}
                            />
                        ) : (
                            <SupersetItemList
                                index={index}
                                name={item.name}
                                exercises={(item as StateSuperset).exercises}
                                onUp={onUp}
                                onDown={onDown}
                                onDelete={onDelete}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => `${item.type}/${item.id}/${index}`}
                />
                <AddItemContainer>
                    <PickerSection items={items} />
                </AddItemContainer>
            </ExercisesContainer>
        </ScrollContainer>
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
    const { exercise, superset } = state;
    return {
        exercises: exercise.exercises,
        supersets: superset.supersets
    };
};

const mapDispatchToProps = {
    addPlanAction: addPlan
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePlan);
