import React, { FC } from 'react';
import styled from 'styled-components/native';
import Logo from '../../../assets/svg/logo.svg';

type Props = {
    width?: string;
    height?: string;
};

const LogoIcon: FC<Props> = ({ width = 'auto', height = 'auto' }: Props) => {
    return (
        <LogoContainer height={height} width={width}>
            <Logo />
        </LogoContainer>
    );
};

type LogoContainerProps = {
    width: string;
    height: string;
};

const LogoContainer = styled.View<LogoContainerProps>`
    aspect-ratio: 1;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
`;

export default LogoIcon;
