import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Colors, DefaultTextFont } from '../utils';
import { DeleteIcon, DownIcon, UpIcon } from './icons';

interface Props {
    index: number;
    name: string;
    onDelete: (index: number) => void;
    onUp: (index: number) => void;
    onDown: (index: number) => void;
}

const ExerciseItemList: FC<Props> = ({
    index,
    name,
    onDelete,
    onDown,
    onUp
}: Props) => {
    return (
        <Container>
            <TextContainer>
                <ItemText>{`${index + 1}. `}</ItemText>
                <ItemText>{name}</ItemText>
            </TextContainer>
            <IconsContainer>
                <UpIcon onClick={() => onUp(index)} />
                <DownIcon onClick={() => onDown(index)} />
                <DeleteIcon onClick={() => onDelete(index)} />
            </IconsContainer>
        </Container>
    );
};

const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 8px;
`;

const TextContainer = styled.View`
    max-width: 180px;
    flex-direction: row;
`;

const IconsContainer = styled.View`
    flex-direction: row;
    flex-wrap: nowrap;
`;

const ItemText = styled(DefaultTextFont)`
    color: ${Colors.WHITE};
`;

export default ExerciseItemList;
