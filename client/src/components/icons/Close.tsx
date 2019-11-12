import React, {FC, ReactElement} from "react";
import Close from "./../../../assets/close.svg";
import styled from 'styled-components/native'

interface Props {
    width?: string
    height?: string
}

export const CloseIcon: FC<Props> = ({width, height}): ReactElement => {
    const CloseContainer = styled.View`
        aspect-ratio: 1;
        width: ${width ? width : 'auto'};
        height: ${height ? height : 'auto'};
    `;

    return (
        <CloseContainer>
            <Close />
        </CloseContainer>
    )
};


