import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Colors } from '../../utils';
import { TouchableWithoutFeedback } from 'react-native';

interface Props {
    onClick: () => void;
    width?: number;
    height?: number;
}

const UpIcon: FC<Props> = ({ onClick, height = 20, width = 26 }: Props) => {
    const Container = container(height, width);
    const LeftArm = leftArm(height, width);
    const RightArm = rightArm(height, width);

    return (
        <Button>
            <TouchableWithoutFeedback onPress={onClick}>
                <Container>
                    <LeftArm />
                    <RightArm />
                </Container>
            </TouchableWithoutFeedback>
        </Button>
    );
};

const Button = styled.View`
    margin-left: 5px;
    margin-right: 5px;
`;

const container = (height, width) => styled.View`
    height: ${height}px;
    width: ${width - 4}px;
    flex-direction: row;
`;

const leftArm = (height, width) => styled.View`
    background-color: ${Colors.GRAY};
    height: 3px;
    width: ${width / 2}px;
    transform: translateX(-${width / 2}px) rotate(-30deg)
        translateX(${width / 2}px) translateY(${height / 2 - 6}px);
`;

const rightArm = (height, width) => styled.View`
    background-color: ${Colors.GRAY};
    height: 3px;
    width: ${width / 2}px;
    transform: translateX(${width / 2}px) rotate(30deg)
        translateX(-${width / 2}px) translateY(${height / 2 - 6}px);
`;

export default UpIcon;
