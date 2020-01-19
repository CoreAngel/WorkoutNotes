import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { cloneDeep } from 'lodash';
import { connect } from 'react-redux';
import Colors from '../utils/Colors';
import { DefaultText } from '../components/DefaultText';
import ScrollContainer from '../components/ScrollContainer';
import CheckBox from '../components/inputs/CheckBox';
import TextInput from '../components/inputs/TextInput';
import Button from '../components/buttons/Button';
import { Exercise } from '../redux/exercise/types';
import { addExercise } from '../redux/exercise/exerciseActions';

type Props = {
    addExerciseAction: typeof addExercise;
};

const AddExercise: FC<Props> = ({ addExerciseAction }: Props) => {
    const [state, setState] = useState({
        name: '',
        desc: '',
        addBody: false
    });

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
        const clonedState = cloneDeep(state);
        clonedState.addBody = status;
        setState({ ...clonedState });
    };

    const saveExercise = () => {
        const exercise: Exercise = {
            name: state.name,
            desc: state.desc,
            addBody: state.addBody,
            workouts: []
        };
        addExerciseAction(exercise);
    };

    const absoluteSaveButton = (
        <SaveButtonContainer>
            <Button label="Save" onClick={saveExercise} />
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
    addExerciseAction: addExercise
};

export default connect(
    null,
    mapDispatchToProps
)(AddExercise);
