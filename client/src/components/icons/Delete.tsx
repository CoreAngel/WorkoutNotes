import React, { FC } from 'react';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../../utils';

interface Props {
    onClick: () => void;
    width?: string;
    height?: string;
}

const DeleteIcon: FC<Props> = ({
    onClick,
    height = '20px',
    width = '18px'
}: Props) => {
    return (
        <Button>
            <TouchableWithoutFeedback onPress={onClick}>
                <Container height={height} width={width}>
                    <Icon height={height} width={width} />
                </Container>
            </TouchableWithoutFeedback>
        </Button>
    );
};

type ContainerProps = {
    width: string;
    height: string;
};

const Container = styled.View<ContainerProps>`
    height: ${({ height }) => height};
    width: ${({ width }) => width};
    flex-direction: row;
`;

type IconProps = {
    width: string;
    height: string;
};

const Icon = styled.View<IconProps>`
    background-color: ${Colors.PRIMARY};
    height: 3px;
    width: ${({ width }) => width};
    transform: translateY(
        ${({ height }) => Number.parseInt(height, 10) / 2 - 1}px
    );
`;

const Button = styled.View`
    margin-left: 8px;
    margin-right: 8px;
`;

export default DeleteIcon;
