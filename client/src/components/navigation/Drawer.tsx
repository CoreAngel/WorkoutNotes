import React, {FC} from "react";
import styled from 'styled-components/native'
import {Colors} from "../../utils/colors";
import {CloseIcon} from '../icons'
import {DrawerOption} from './DrawerOption'
import {TouchableOpacity} from "react-native";
import {DrawerActions} from "react-navigation-drawer";
import {NavigationSwitchProp} from "react-navigation";

const data = [
    {
        label: "Measurement",
        path: ""
    },
    {
        label: "Metrics",
        path: ""
    },
    {
        label: "Sign in",
        path: "",
        auth: false
    },
    {
        label: "Sign up",
        path: "",
        auth: false
    },
    {
        label: "Logout",
        path: "",
        auth: true
    },
];

interface Props {
    navigation: NavigationSwitchProp
}

export const Drawer: FC<Props> = ({navigation}) => {
    return <Container>
        <CloseIconContainer>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <CloseIcon height="25px"/>
            </TouchableOpacity>
        </CloseIconContainer>
        <OptionContainer>
            {data
                .filter((item) => item.auth === undefined || item.auth === false)
                .map(item => {
                    return <DrawerOption key={item.label} label={item.label} path={item.path}/>;
            })}
        </OptionContainer>
    </Container>
};

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px 20px 20px 35px;
  background-color: ${Colors.SECONDARY};
`;

const CloseIconContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const OptionContainer = styled.View`
  color: ${Colors.WHITE};
`;
