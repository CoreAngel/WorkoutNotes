import React, { FC } from 'react';
import styled from 'styled-components/native';
import Logo from '../../../assets/svg/logo.svg';

interface Props {
    width?: string;
    height?: string;
}

const LogoIcon: FC<Props> = ({ width, height }: Props) => {
    const LogoContainer = styled.View`
        aspect-ratio: 1;
        width: ${width != null ? width : 'auto'};
        height: ${height != null ? height : 'auto'};
    `;

    return (
        <LogoContainer>
            <Logo />
        </LogoContainer>
    );
};

export default LogoIcon;
