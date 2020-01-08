import React, { FC } from 'react';
import styled from 'styled-components/native';
import Play from '../../../assets/svg/play.svg';

type Props = {
    width?: string;
    height?: string;
};

const PlayIcon: FC<Props> = ({ width, height }: Props) => {
    return (
        <PlayContainer height={height} width={width}>
            <Play />
        </PlayContainer>
    );
};

type PlayContainerProps = {
    width: string;
    height: string;
};

const PlayContainer = styled.View<PlayContainerProps>`
    aspect-ratio: 1;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
`;

export default PlayIcon;
