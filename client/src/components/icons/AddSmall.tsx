import React, { FC } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../../utils';

interface Props {
    onClick: () => void;
    width?: number;
    height?: number;
}

const AddSmallIcon: FC<Props> = ({
    onClick,
    height = 18,
    width = 18
}: Props) => {
    const Container = styled.View`
        height: ${height}px;
        width: ${width}px;
        flex-direction: row;
        position: relative;
    `;

    const HorizontalArm = styled.View`
        background-color: ${Colors.PRIMARY};
        position: absolute;
        height: 3px;
        width: ${width}px;
        transform: translateY(${width / 2 - 1}px);
    `;

    const VerticalArm = styled.View`
        background-color: ${Colors.PRIMARY};
        position: absolute;
        height: 3px;
        width: ${width}px;
        transform: rotate(90deg) translateY(${width / 2 - 1}px);
    `;

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

export default AddSmallIcon;
