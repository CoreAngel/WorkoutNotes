import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Colors, DefaultTextFont } from '../utils';
import { TextInput } from '../components/inputs';
import ExerciseItemList from '../components/ExerciseItemList';
import { Picker } from '../components/inputs/Picker';
import { Button } from '../components/buttons';

const data = [
    {
        id: 0,
        value: '0',
        name: 'Bench Press'
    },
    {
        id: 1,
        value: '1',
        name: 'Squat'
    },
    {
        id: 2,
        value: '2',
        name: 'Dead lift'
    }
];

const data2 = [
    {
        value: '0',
        name: 'Bench Press'
    },
    {
        value: '1',
        name: 'Squat'
    },
    {
        value: '2',
        name: 'Dead lift'
    }
];

const CreateSuperset: FC = () => {
    const [state, setState] = useState({
        name: '',
        desc: '',
        exercises: []
    });

    const onChange = () => {};

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
            <ExercisesLabel>Exercises</ExercisesLabel>
            <ExercisesContainer>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <ExerciseItemList index={index} name={item.name} />
                        );
                    }}
                    keyExtractor={item => item.id.toString()}
                />
                <AddItemContainer>
                    <Picker items={data2} onChange={onChange} />
                </AddItemContainer>
            </ExercisesContainer>
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

const ExercisesLabel = styled(DefaultTextFont)`
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

export default CreateSuperset;
