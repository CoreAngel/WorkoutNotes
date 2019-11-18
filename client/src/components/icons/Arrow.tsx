import React, {FC, ReactElement} from "react";
import Arrow from "../../../assets/svg/arrow.svg";
import styled from 'styled-components/native'

interface Props {
    width?: string
    height?: string
}

export const ArrowIcon: FC<Props> = ({width, height}): ReactElement => {
    const ArrowContainer = styled.View`
        aspect-ratio: 1;
        width: ${width ? width : 'auto'};
        height: ${height ? height : 'auto'};
    `;

    return (
        <ArrowContainer>
            <Arrow />
        </ArrowContainer>
    )
};


