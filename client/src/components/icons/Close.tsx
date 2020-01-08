import React, { FC } from 'react';
import styled from 'styled-components/native';
import Close from '../../../assets/svg/close.svg';

interface Props {
    width?: string;
    height?: string;
}

const CloseIcon: FC<Props> = ({ width = 'auto', height = 'auto' }: Props) => {
    return (
        <CloseContainer width={width} height={height}>
            <Close />
        </CloseContainer>
    );
};

type CloseContainerProps = {
    width: string;
    height: string;
};

const CloseContainer = styled.View<CloseContainerProps>`
    aspect-ratio: 1;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
`;

export default CloseIcon;
