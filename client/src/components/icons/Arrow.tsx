import React, { FC } from 'react';
import styled from 'styled-components/native';
import Arrow from '../../../assets/svg/arrow.svg';

interface Props {
    width?: string;
    height?: string;
}

const ArrowIcon: FC<Props> = ({ width, height }: Props) => {
    const ArrowContainer = styled.View`
        aspect-ratio: 1;
        width: ${width != null ? width : 'auto'};
        height: ${height != null ? height : 'auto'};
    `;

    return (
        <ArrowContainer>
            <Arrow />
        </ArrowContainer>
    );
};

export default ArrowIcon;
