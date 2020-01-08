import React, { FC } from 'react';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../../utils';

type Props = {
    onClick: () => void;
    width?: string;
    height?: string;
};

const DownIcon: FC<Props> = ({ onClick, height = '20px', width = '26px' }: Props) => {
    return (
        <Button>
            <TouchableWithoutFeedback onPress={onClick}>
                <Container height={height} width={width}>
                    <LeftArm height={height} width={width} />
                    <RightArm height={height} width={width} />
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
    width: ${({ width }) => Number.parseInt(width, 10) - 4}px;
    flex-direction: row;
`;

type ArmProps = {
    width: string;
    height: string;
};

const LeftArm = styled.View<ArmProps>`
    background-color: ${Colors.GRAY};
    height: 3px;
    width: ${({ width }) => Number.parseInt(width, 10) / 2}px;
    transform: translateX(-${({ width }) => Number.parseInt(width, 10) / 2}px) rotate(30deg)
        translateX(${({ width }) => Number.parseInt(width, 10) / 2}px)
        translateY(${({ height }) => Number.parseInt(height, 10) / 2 + 6}px);
`;

const RightArm = styled.View<ArmProps>`
    background-color: ${Colors.GRAY};
    height: 3px;
    width: ${({ width }) => Number.parseInt(width, 10) / 2}px;
    transform: translateX(${({ width }) => Number.parseInt(width, 10) / 2}px) rotate(-30deg)
        translateX(-${({ width }) => Number.parseInt(width, 10) / 2}px)
        translateY(${({ height }) => Number.parseInt(height, 10) / 2 + 6}px);
`;

const Button = styled.View`
    margin-left: 5px;
    margin-right: 5px;
`;

export default DownIcon;
