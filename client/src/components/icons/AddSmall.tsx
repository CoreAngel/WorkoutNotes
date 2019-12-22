import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Colors } from '../../utils';
import { TouchableWithoutFeedback } from 'react-native';

interface Props {
    onClick: () => void;
    width?: number;
    height?: number;
}

const AddSmallIcon: FC<Props> = ({
    onClick,
    height = 20,
    width = 20
}: Props) => {
    const Container = container(height, width);
    const HorizontalArm = horizontalArm(width);
    const VerticalArm = verticalArm(width);

    return (
        <Button>
            <TouchableWithoutFeedback onPress={onClick}>
                <Container>
                    <HorizontalArm />
                    <VerticalArm />
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
    position: relative;
`;

const horizontalArm = size => styled.View`
    background-color: ${Colors.PRIMARY};
    position: absolute;
    height: 3px;
    width: ${(4 * size) / 5}px;
    transform: translateY(${size / 2 - 1}px);
`;

const verticalArm = size => styled.View`
    background-color: ${Colors.PRIMARY};
    position: absolute;
    height: 3px;
    width: ${(4 * size) / 5}px;
    transform: rotate(90deg) translateY(${size / 2 - 1}px);
`;

export default AddSmallIcon;
