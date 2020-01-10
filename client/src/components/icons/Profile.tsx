import React, { FC } from 'react';
import styled from 'styled-components/native';
import Profile from '../../../assets/svg/profile.svg';

interface Props {
    width?: string;
    height?: string;
}

const ProfileIcon: FC<Props> = ({ width = 'auto', height = 'auto' }: Props) => {
    return (
        <ProfileContainer height={height} width={width}>
            <Profile />
        </ProfileContainer>
    );
};

type ProfileContainerProps = {
    width: string;
    height: string;
};

const ProfileContainer = styled.View<ProfileContainerProps>`
    aspect-ratio: 1;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
`;

export default ProfileIcon;
