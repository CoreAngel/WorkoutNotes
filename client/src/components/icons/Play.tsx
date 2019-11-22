import React, { FC } from 'react';
import styled from 'styled-components/native';
import Play from '../../../assets/svg/play.svg';

interface Props {
    width?: string;
    height?: string;
}

const PlayIcon: FC<Props> = ({ width, height }: Props) => {
    const ArrowContainer = styled.View`
        aspect-ratio: 1;
        width: ${width != null ? width : 'auto'};
        height: ${height != null ? height : 'auto'};
        transform: translateX(2px);
    `;

    return (
        <ArrowContainer>
            <Play />
        </ArrowContainer>
    );
};

export default PlayIcon;
