import React, { FC } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../../utils';

type Props = {
    onClick: () => void;
    width?: string;
    height?: string;
};

const AddSmallIcon: FC<Props> = ({ onClick, height = '18px', width = '18px' }: Props) => {
    return (
        <Button>
            <TouchableWithoutFeedback onPress={onClick}>
                <Container height={height} width={width}>
                    <HorizontalArm width={width} />
                    <VerticalArm width={width} />
                </Container>
            </TouchableWithoutFeedback>
        </Button>
    );
};

type ContainerProps = {
    height: string;
    width: string;
};

const Container = styled.View<ContainerProps>`
    height: ${({ height }) => height};
    width: ${({ width }) => width};
    flex-direction: row;
    position: relative;
`;

type ArmProps = {
    width: string;
};

const HorizontalArm = styled.View<ArmProps>`
    background-color: ${Colors.PRIMARY};
    position: absolute;
    height: 3px;
    width: ${({ width }) => width};
    transform: translateY(${({ width }) => Number.parseInt(width, 10) / 2 - 1}px);
`;

const VerticalArm = styled.View<ArmProps>`
    background-color: ${Colors.PRIMARY};
    position: absolute;
    height: 3px;
    width: ${({ width }) => width};
    transform: rotate(90deg) translateY(${({ width }) => Number.parseInt(width, 10) / 2 - 1}px);
`;

const Button = styled.View`
    margin-left: 8px;
    margin-right: 8px;
`;

export default AddSmallIcon;
