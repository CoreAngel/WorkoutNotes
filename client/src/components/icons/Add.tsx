import React, {FC, ReactElement} from "react";
import Add from "../../../assets/svg/add.svg";
import styled from 'styled-components/native'

interface Props {
    width?: string
    height?: string
}

export const AddIcon: FC<Props> = ({width, height}): ReactElement => {
    const ArrowContainer = styled.View`
        aspect-ratio: 1;
        width: ${width ? width : 'auto'};
        height: ${height ? height : 'auto'};
    `;

    return (
        <ArrowContainer>
            <Add />
        </ArrowContainer>
    )
};


