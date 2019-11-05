import React, {FC, ReactElement} from "react";
import Play from "./../../../assets/play.svg";
import styled from 'styled-components/native'

interface Props {
    width?: string
    height?: string
}

export const PlayIcon: FC<Props> = ({width, height}): ReactElement => {
    const ArrowContainer = styled.View`
        aspect-ratio: 1;
        width: ${width ? width : 'auto'};
        height: ${height ? height : 'auto'};
        transform: translateX(2px);
    `;

    return (
        <ArrowContainer>
            <Play />
        </ArrowContainer>
    )
};


