import React, {FC, ReactElement} from "react";
import styled from 'styled-components/native'
import {Colors} from "../../utils/Colors";
import {LogoIcon, ProfileIcon} from "../icons";
import { Header } from 'react-navigation-stack'
import {DrawerActions, NavigationDrawerProp} from "react-navigation-drawer";

interface Props {
    navigation: NavigationDrawerProp
}

export const HomeHeader: FC<Props> = ({navigation}): ReactElement => {
    return <Container>
        <HeaderContainer>
            <LogotypeContainer>
                <LogoIcon/>
                <AppName>Workout Notes</AppName>
            </LogotypeContainer>
            <ProfileButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <ProfileIcon/>
            </ProfileButton>
        </HeaderContainer>
    </Container>;
};

const Container = styled.View`
  background-color: ${Colors.SECONDARY}
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

const AppName = styled.Text`
  margin-left: 10px;
  color: ${Colors.WHITE};
  font-size: 22px;
  margin-top: auto;
  margin-bottom: auto;
`;

const ProfileButton = styled.TouchableOpacity`
  padding: 7px;
`;
