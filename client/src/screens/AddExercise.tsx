import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import Colors from '../utils/Colors';
import { DefaultText } from '../components/DefaultText';
import ScrollContainer from '../components/ScrollContainer';
import CheckBox from '../components/inputs/CheckBox';
import TextInput from '../components/inputs/TextInput';
import Button from '../components/buttons/Button';
import { Exercise } from '../redux/exercise/types';
import { addExercise, modifyExercise } from '../redux/exercise/exerciseActions';
import store from '../redux/store';

type Props = {
    navigation: NavigationStackProp<{ exercise: Exercise | null }>;
    addExerciseAction: typeof addExercise;
    modifyExerciseAction: typeof modifyExercise;
};

const AddExercise: FC<Props> = ({ navigation, addExerciseAction, modifyExerciseAction }: Props) => {
    const setInitialState = (): Exercise => {
        const { exercise } = navigation.state.params;
        if (exercise !== null) {
            return exercise;
        }
        return {
            name: '',
            desc: '',
            addBody: false,
            workouts: []
        };
    };
    const [state, setState] = useState<Exercise>(setInitialState());

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

    const onChangeAddBodyStatus = (status: boolean) => {
        setState({
            ...state,
            addBody: status
        });
    };

    const saveExercise = () => {
        if (state.id == null) {
            addExerciseAction(state);
            return;
        }

        const exercise = store.getState().exercise.exercises.find(item => item.id === state.id);
        modifyExerciseAction({
            ...state,
            workouts: exercise.workouts
        });
    };

    const absoluteSaveButton = (
        <SaveButtonContainer>
            <Button label="Save" onClick={saveExercise} />
        </SaveButtonContainer>
    );

    return (
        <ScrollContainer absoluteChild={absoluteSaveButton}>
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

            <SettingsLabel>Settings</SettingsLabel>
            <SettingsContainer>
                <Option>
                    <CheckBox
                        label="Add body weight"
                        onChange={onChangeAddBodyStatus}
                        defaultValue={state.addBody}
                    />
                </Option>
            </SettingsContainer>
        </ScrollContainer>
    );
};

const TextInputContainer = styled.View`
    margin-bottom: 20px;
`;

const SettingsLabel = styled(DefaultText)`
    color: ${Colors.WHITE70};
    margin-top: 30px;
    margin-bottom: 10px;
`;

const SettingsContainer = styled.View`
    padding-left: 30px;
`;

const Option = styled.View`
    margin-top: 10px;
    margin-bottom: 10px;
`;

const SaveButtonContainer = styled.View`
    position: absolute;
    bottom: 20px;
    right: 20px;
`;

const mapDispatchToProps = {
    addExerciseAction: addExercise,
    modifyExerciseAction: modifyExercise
};

export default connect(
    null,
    mapDispatchToProps
)(AddExercise);
