import React, { FC } from 'react';
import styled from 'styled-components/native';
import Add from '../../../assets/svg/add.svg';

type Props = {
    width?: string;
    height?: string;
};

const AddIcon: FC<Props> = ({ width = 'auto', height = 'auto' }: Props) => {
    return (
        <AddContainer width={width} height={height}>
            <Add />
        </AddContainer>
    );
};

type AddContainerProps = {
    width: string;
    height: string;
};

const AddContainer = styled.View<AddContainerProps>`
    aspect-ratio: 1;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
`;

export default AddIcon;
