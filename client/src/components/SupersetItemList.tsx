import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Colors, DefaultTextFont } from '../utils';
import { DeleteIcon, DownIcon, UpIcon } from './icons';

type Props = {
    index: number;
    name: string;
    exercises: string[];
    onDelete: (index: number) => void;
    onUp: (index: number) => void;
    onDown: (index: number) => void;
};

const SupersetItemList: FC<Props> = ({
    index,
    name,
    exercises,
    onDelete,
    onDown,
    onUp
}: Props) => {
    const exercisesWithId = exercises.map((item, exIndex) => {
        return {
            id: exIndex,
            item
        };
    });

    return (
        <Container>
            <NameContainer>
                <TextContainer>
                    <ItemText>{`${index + 1}. `}</ItemText>
                    <ItemText>{name}</ItemText>
                </TextContainer>
                <IconsContainer>
                    <UpIcon onClick={() => onUp(index)} />
                    <DownIcon onClick={() => onDown(index)} />
                    <DeleteIcon onClick={() => onDelete(index)} />
                </IconsContainer>
            </NameContainer>
            <ExercisesContainer>
                {exercisesWithId.map(({ item, id }) => (
                    <ExerciseText key={id}>{item}</ExerciseText>
                ))}
            </ExercisesContainer>
        </Container>
    );
};

const Container = styled.View`
    margin-top: 8px;
    margin-bottom: 8px;
`;

const NameContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const TextContainer = styled.View`
    max-width: 180px;
    flex-direction: row;
`;

const ExercisesContainer = styled.View`
    padding-left: 30px;
`;

const IconsContainer = styled.View`
    flex-direction: row;
    flex-wrap: nowrap;
`;

const ItemText = styled(DefaultTextFont)`
    color: ${Colors.WHITE};
`;

const ExerciseText = styled(DefaultTextFont)`
    font-size: 14px;
    color: ${Colors.WHITE70};
`;

export default SupersetItemList;
