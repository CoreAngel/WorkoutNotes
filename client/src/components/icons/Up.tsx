import React, { FC } from 'react';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../../utils';

interface Props {
    onClick: () => void;
    width?: number;
    height?: number;
}

const UpIcon: FC<Props> = ({ onClick, height = 20, width = 26 }: Props) => {
    const Container = styled.View`
        height: ${height}px;
        width: ${width - 4}px;
        flex-direction: row;
    `;

    const LeftArm = styled.View`
        background-color: ${Colors.GRAY};
        height: 3px;
        width: ${width / 2}px;
        transform: translateX(-${width / 2}px) rotate(-30deg)
            translateX(${width / 2}px) translateY(${height / 2 - 6}px);
    `;

    const RightArm = styled.View`
        background-color: ${Colors.GRAY};
        height: 3px;
        width: ${width / 2}px;
        transform: translateX(${width / 2}px) rotate(30deg)
            translateX(-${width / 2}px) translateY(${height / 2 - 6}px);
    `;

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

export default UpIcon;
