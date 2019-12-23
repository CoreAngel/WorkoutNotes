import React, { FC } from 'react';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../../utils';

interface Props {
    onClick: () => void;
    width?: number;
    height?: number;
}

const DeleteIcon: FC<Props> = ({ onClick, height = 20, width = 18 }: Props) => {
    const Container = styled.View`
        height: ${height}px;
        width: ${width}px;
        flex-direction: row;
    `;

    const Icon = styled.View`
        background-color: ${Colors.PRIMARY};
        height: 3px;
        width: ${width}px;
        transform: translateY(${height / 2 - 1}px);
    `;

    return (
        <Button>
            <TouchableWithoutFeedback onPress={onClick}>
                <Container>
                    <Icon />
                </Container>
            </TouchableWithoutFeedback>
        </Button>
    );
};

const Button = styled.View`
    margin-left: 8px;
    margin-right: 8px;
`;

export default DeleteIcon;
