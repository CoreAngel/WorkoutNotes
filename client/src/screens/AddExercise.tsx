import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { cloneDeep } from 'lodash';
import { Colors, DefaultTextFont } from '../utils';
import { TextInput, CheckBox, Select } from '../components/inputs';
import { Button } from '../components/buttons';

const weightItems = [
    { label: 'kilograms', value: 'kg', selected: true },
    { label: 'pounds', value: 'lb', selected: false }
];

const timeItems = [
    { label: 'seconds', value: 's', selected: true },
    { label: 'minutes', value: 'min', selected: false },
    { label: 'hours', value: 'h', selected: false }
];

const AddExercise: FC = () => {
    const [state, setState] = useState({
        name: '',
        desc: '',
        settings: {
            weight: {
                selected: true,
                unit: weightItems.filter(item => item.selected).pop(),
                addBody: false
            },
            time: {
                selected: true,
                unit: timeItems.filter(item => item.selected).pop()
            }
        }
    });

    return (
        <Container>
            <TextInputContainer>
                <TextInput
                    onChangeText={text =>
                        setState({
                            ...state,
                            name: text
                        })
                    }
                    label="Name"
                />
            </TextInputContainer>
            <TextInputContainer>
                <TextInput
                    onChangeText={text =>
                        setState({
                            ...state,
                            desc: text
                        })
                    }
                    label="Description"
                />
            </TextInputContainer>

            <SettingsLabel>Settings</SettingsLabel>
            <SettingsContainer>
                <OptionWithSelect>
                    <CheckBox
                        label="Weight"
                        onChange={status => {
                            const clonedState = cloneDeep(state);
                            clonedState.settings.weight.selected = status;
                            setState({ ...clonedState });
                        }}
                        defaultValue={state.settings.weight.selected}
                    />
                    <Select
                        items={weightItems}
                        onChange={item => {
                            const clonedState = cloneDeep(state);
                            clonedState.settings.weight.unit = item;
                            setState({ ...clonedState });
                        }}
                    />
                </OptionWithSelect>
                <SubOption>
                    <CheckBox
                        label="Add body weight"
                        onChange={status => {
                            const clonedState = cloneDeep(state);
                            clonedState.settings.weight.addBody = status;
                            setState({ ...clonedState });
                        }}
                        defaultValue={state.settings.weight.addBody}
                    />
                </SubOption>
                <OptionWithSelect>
                    <CheckBox
                        label="Time"
                        onChange={status => {
                            const clonedState = cloneDeep(state);
                            clonedState.settings.time.selected = status;
                            setState({ ...clonedState });
                        }}
                        defaultValue={state.settings.time.selected}
                    />
                    <Select
                        items={timeItems}
                        onChange={item => {
                            const clonedState = cloneDeep(state);
                            clonedState.settings.time.unit = item;
                            setState({ ...clonedState });
                        }}
                    />
                </OptionWithSelect>
            </SettingsContainer>
            <SaveButtonContainer>
                <Button label="Save" onClick={() => null} />
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

export default AddExercise;
