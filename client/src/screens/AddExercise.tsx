import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { cloneDeep } from 'lodash';
import { connect } from 'react-redux';
import { Colors, DefaultTextFont } from '../utils';
import { TextInput, CheckBox, Select } from '../components/inputs';
import { Button } from '../components/buttons';
import {
    Exercise,
    Time,
    TimeUnit,
    Weight,
    WeightUnit
} from '../redux/exercise/types';
import { SelectItem } from '../components/inputs/Select';
import { addExercise } from '../redux/exercise/exerciseActions';

const weightItems = Weight.map(item => {
    return {
        label: item.name,
        value: item.unit,
        selected: item.defaultSelected
    };
});

const timeItems = Time.map(item => {
    return {
        label: item.name,
        value: item.unit,
        selected: item.defaultSelected
    };
});

type Props = {
    addExerciseAction: typeof addExercise;
};

const AddExercise: FC<Props> = ({ addExerciseAction }: Props) => {
    const [state, setState] = useState({
        name: '',
        desc: '',
        settings: {
            weight: {
                selected: true,
                unit: weightItems.filter(item => item.selected).pop().value,
                addBody: false
            },
            time: {
                selected: true,
                unit: timeItems.filter(item => item.selected).pop().value
            }
        }
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

    const onChangeWeightStatus = (status: boolean) => {
        const clonedState = cloneDeep(state);
        clonedState.settings.weight.selected = status;
        setState({ ...clonedState });
    };

    const onChangeWeightBodyStatus = (status: boolean) => {
        const clonedState = cloneDeep(state);
        clonedState.settings.weight.addBody = status;
        setState({ ...clonedState });
    };

    const onChangeTimeStatus = (status: boolean) => {
        const clonedState = cloneDeep(state);
        clonedState.settings.time.selected = status;
        setState({ ...clonedState });
    };

    const onChangeWeightUnit = (item: SelectItem) => {
        const clonedState = cloneDeep(state);
        clonedState.settings.weight.unit = item.value as WeightUnit;
        setState({ ...clonedState });
    };

    const onChangeTimeUnit = (item: SelectItem) => {
        const clonedState = cloneDeep(state);
        clonedState.settings.time.unit = item.value as TimeUnit;
        setState({ ...clonedState });
    };

    const saveExercise = () => {
        const exercise: Exercise = {
            name: state.name,
            desc: state.desc,
            time: {
                checked: state.settings.time.selected,
                unit: state.settings.time.unit
            },
            weight: {
                body: state.settings.weight.addBody,
                checked: state.settings.weight.selected,
                unit: state.settings.weight.unit
            }
        };
        addExerciseAction(exercise);
    };

    return (
        <Container>
            <TextInputContainer>
                <TextInput onChangeText={onChangeName} label="Name" />
            </TextInputContainer>
            <TextInputContainer>
                <TextInput onChangeText={onChangeDesc} label="Description" />
            </TextInputContainer>

            <SettingsLabel>Settings</SettingsLabel>
            <SettingsContainer>
                <OptionWithSelect>
                    <CheckBox
                        label="Weight"
                        onChange={onChangeWeightStatus}
                        defaultValue={state.settings.weight.selected}
                    />
                    <Select items={weightItems} onChange={onChangeWeightUnit} />
                </OptionWithSelect>
                <SubOption>
                    <CheckBox
                        label="Add body weight"
                        onChange={onChangeWeightBodyStatus}
                        defaultValue={state.settings.weight.addBody}
                    />
                </SubOption>
                <OptionWithSelect>
                    <CheckBox
                        label="Time"
                        onChange={onChangeTimeStatus}
                        defaultValue={state.settings.time.selected}
                    />
                    <Select items={timeItems} onChange={onChangeTimeUnit} />
                </OptionWithSelect>
            </SettingsContainer>
            <SaveButtonContainer>
                <Button label="Save" onClick={saveExercise} />
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

const SettingsLabel = styled(DefaultTextFont)`
    color: ${Colors.WHITE70};
    margin-top: 30px;
`;

const SettingsContainer = styled.View`
    padding-left: 30px;
`;

const OptionWithSelect = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const SubOption = styled.View`
    padding-left: 30px;
`;

const SaveButtonContainer = styled.View`
    margin-top: auto;
    margin-left: auto;
`;

const mapDispatchToProps = {
    addExerciseAction: addExercise
};

export default connect(
    null,
    mapDispatchToProps
)(AddExercise);
