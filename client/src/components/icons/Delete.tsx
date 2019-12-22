import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Colors } from '../../utils';
import { TouchableWithoutFeedback } from 'react-native';

interface Props {
    onClick: () => void;
    width?: number;
    height?: number;
}

const DeleteIcon: FC<Props> = ({ onClick, height = 20, width = 18 }: Props) => {
    const Container = container(height, width);
    const Icon = icon(height, width);

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

const container = (height, width) => styled.View`
    height: ${height}px;
    width: ${width}px;
    flex-direction: row;
`;

const icon = (height, width) => styled.View`
    background-color: ${Colors.PRIMARY};
    height: 3px;
    width: ${width}px;
    transform: translateY(${height / 2 - 1}px);
`;

export default DeleteIcon;
