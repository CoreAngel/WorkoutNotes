import React, { FC } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../utils/Colors';

type Props = {
    onClick: () => void;
    width?: string;
    height?: string;
};

const Edit: FC<Props> = ({ onClick, height = '18px', width = '18px' }: Props) => {
    return (
        <Button>
            <TouchableWithoutFeedback onPress={onClick}>
                <Container height={height} width={width}>
                    <RotateContainer>
                        <PenContainer>
                            <Arrow />
                            <Rect />
                        </PenContainer>
                    </RotateContainer>
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

const PenContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const RotateContainer = styled.View`
    justify-content: center;
    align-items: center;
    transform: rotate(-45deg);
`;

const Arrow = styled.View`
    height: 0;
    width: 0;
    border-right-width: 7px;
    border-top-width: 2px;
    border-bottom-width: 2px;
    border-left-width: 0;
    border-right-color: ${Colors.PRIMARY};
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
`;

const Rect = styled.View`
    background-color: ${Colors.PRIMARY};
    width: 16px;
    height: 4px;
`;

const Button = styled.View`
    margin: 0 8px;
`;

export default Edit;
