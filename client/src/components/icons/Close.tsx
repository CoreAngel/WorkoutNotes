import React, { FC } from 'react';
import styled from 'styled-components/native';
import Close from '../../../assets/svg/close.svg';

interface Props {
    width?: string;
    height?: string;
}

const CloseIcon: FC<Props> = ({ width, height }: Props) => {
    const CloseContainer = styled.View`
        aspect-ratio: 1;
        width: ${width != null ? width : 'auto'};
        height: ${height != null ? height : 'auto'};
    `;

    return (
        <CloseContainer>
            <Close />
        </CloseContainer>
    );
};

export default CloseIcon;
