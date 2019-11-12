import React, {FC, ReactElement} from "react";
import Logo from "./../../../assets/logo.svg";
import styled from 'styled-components/native'

interface Props {
    width?: string
    height?: string
}

export const LogoIcon: FC<Props> = ({width, height}): ReactElement => {
    const LogoContainer = styled.View`
        aspect-ratio: 1;
        width: ${width ? width : 'auto'};
        height: ${height ? height : 'auto'};
    `;

    return (
        <LogoContainer>
            <Logo />
        </LogoContainer>
    )
};


