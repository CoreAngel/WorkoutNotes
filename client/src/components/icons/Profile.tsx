import React, {FC, ReactElement} from "react";
import Profile from "../../../assets/svg/profile.svg";
import styled from 'styled-components/native'

interface Props {
    width?: string
    height?: string
}

export const ProfileIcon: FC<Props> = ({width, height}): ReactElement => {
    const ProfileContainer = styled.View`
        aspect-ratio: 1;
        width: ${width ? width : 'auto'};
        height: ${height ? height : 'auto'};
    `;

    return (
        <ProfileContainer>
            <Profile />
        </ProfileContainer>
    )
};


