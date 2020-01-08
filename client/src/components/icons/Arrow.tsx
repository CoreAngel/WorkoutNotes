import React, { FC } from 'react';
import styled from 'styled-components/native';
import Arrow from '../../../assets/svg/arrow.svg';

type Props = {
    width?: string;
    height?: string;
};

const ArrowIcon: FC<Props> = ({ width = 'auto', height = 'auto' }: Props) => {
    return (
        <ArrowContainer width={width} height={height}>
            <Arrow />
        </ArrowContainer>
    );
};

type ArrowContainerProps = {
    width: string;
    height: string;
};

const ArrowContainer = styled.View<ArrowContainerProps>`
    aspect-ratio: 1;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
`;

export default ArrowIcon;
