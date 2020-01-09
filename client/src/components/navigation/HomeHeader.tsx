import React, { FC } from 'react';
import styled from 'styled-components/native';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { Header } from 'react-navigation-stack';
import Colors from '../../utils/Colors';
import { DefaultText } from '../DefaultText';
import { LogoIcon, ProfileIcon } from '../icons';
import { drawer } from '../../navigation';

type Props = {
    navigation: NavigationDrawerProp;
};

const HomeHeader: FC<Props> = ({ navigation }: Props) => {
    return (
        <Container>
            <HeaderContainer>
                <LogotypeContainer>
                    <LogoIcon />
                    <AppName>Workout Notes</AppName>
                </LogotypeContainer>
                <ProfileButton onPress={drawer.open}>
                    <ProfileIcon />
                </ProfileButton>
            </HeaderContainer>
        </Container>
    );
};

const Container = styled.View`
    background-color: ${Colors.SECONDARY};
`;

const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 15px 8px 15px;
    height: ${Header.HEIGHT}px;
`;

const LogotypeContainer = styled.View`
    flex-direction: row;
`;

const AppName = styled(DefaultText)`
    margin-left: 10px;
    color: ${Colors.WHITE};
    font-size: 22px;
    margin-top: auto;
    margin-bottom: auto;
`;

const ProfileButton = styled.TouchableOpacity`
    padding: 7px;
`;

export default HomeHeader;
