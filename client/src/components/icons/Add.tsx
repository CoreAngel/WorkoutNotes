import React, { FC } from 'react';
import styled from 'styled-components/native';
import Add from '../../../assets/svg/add.svg';

interface Props {
    width?: string;
    height?: string;
}

const AddIcon: FC<Props> = ({ width, height }: Props) => {
    const ArrowContainer = styled.View`
        aspect-ratio: 1;
        width: ${width != null ? width : 'auto'};
        height: ${height != null ? height : 'auto'};
    `;

    return (
        <ArrowContainer>
            <Add />
        </ArrowContainer>
    );
};

export default AddIcon;
