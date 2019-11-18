import React, {FC, useState} from "react";
import styled from "styled-components/native";
import {Colors} from "../utils/Colors";
import {TextInput, CheckBox, Select} from '../components/inputs'
import { cloneDeep } from 'lodash'
import {Button} from "../components/buttons";

const weightItems = [
    { label: "kilograms", value: 'kg', selected: true },
    { label: "pounds", value: 'lb', selected: false },
];

const timeItems = [
    { label: "seconds", value: 's', selected: true },
    { label: "minutes", value: 'min', selected: false },
    { label: "hours", value: 'h', selected: false },
];

export const AddExercise: FC = () => {
    const [state, setState] = useState({
        name: "",
        desc: "",
        settings: {
            weight: {
                selected: true,
                unit: weightItems.findIndex(item => item.selected),
                addBody: false
            },
            time: {
                selected: true,
                unit: timeItems.findIndex(item => item.selected),
            }
        }
    });

    return (
        <Container>
            <TextInputContainer>
                <TextInput onChangeText={text => setState({
                    ...state,
                    name: text
                })} label={"Name"}/>
            </TextInputContainer>
            <TextInputContainer>
                <TextInput onChangeText={text => setState({
                    ...state,
                    desc: text
                })} label={"Description"}/>
            </TextInputContainer>

            <SettingsLabel>Settings</SettingsLabel>
            <SettingsContainer>
                <OptionWithSelect>
                    <CheckBox label={"Weight"} onChange={status => {
                        const clonedState = cloneDeep(state);
                        clonedState.settings.weight.selected = status;
                        setState({...clonedState});
                    }} defaultValue={state.settings.weight.selected}/>
                    <Select items={weightItems} onChange={index => {
                        const clonedState = cloneDeep(state);
                        clonedState.settings.weight.unit = index;
                        setState({...clonedState});
                    }}/>
                </OptionWithSelect>
                <SubOption>
                    <CheckBox label={"Add body weight"} onChange={status => {
                        const clonedState = cloneDeep(state);
                        clonedState.settings.weight.addBody = status;
                        setState({...clonedState});
                    }} defaultValue={state.settings.weight.addBody}/>
                </SubOption>
                <OptionWithSelect>
                    <CheckBox label={"Time"} onChange={status => {
                        const clonedState = cloneDeep(state);
                        clonedState.settings.time.selected = status;
                        setState({...clonedState})
                    }} defaultValue={state.settings.time.selected}/>
                    <Select items={timeItems} onChange={index => {
                        const clonedState = cloneDeep(state);
                        clonedState.settings.time.unit = index;
                        setState({...clonedState});
                    }}/>
                </OptionWithSelect>
            </SettingsContainer>
            <SaveButtonContainer>
                <Button label={'Save'} onClick={()=>null}/>
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

const SettingsLabel = styled.Text`
  color: ${Colors.WHITE70};
  font-size: 16px;
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
