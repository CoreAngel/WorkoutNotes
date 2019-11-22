import React, { FC } from 'react';
import styled from 'styled-components/native';
import Profile from '../../../assets/svg/profile.svg';

interface Props {
    width?: string;
    height?: string;
}

const ProfileIcon: FC<Props> = ({ width, height }: Props) => {
    const ProfileContainer = styled.View`
        aspect-ratio: 1;
        width: ${width != null ? width : 'auto'};
        height: ${height != null ? height : 'auto'};
    `;

    return (
        <ProfileContainer>
            <Profile />
        </ProfileContainer>
    );
};

export default ProfileIcon;
