import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { DrawerContentComponentProps } from 'react-navigation-drawer';
import Colors from '../../../utils/Colors';
import { CloseIcon } from '../../icons';
import DrawerOption from './DrawerOption';
import { drawer } from '../../../navigation/navigationService';
import { navigateToSignIn, navigateToSignUp } from '../../../navigation/navigationActions';

const data = [
    // {
    //     label: 'Measurement',
    //     path: ''
    // },
    // {
    //     label: 'Metrics',
    //     path: ''
    // },
    {
        label: 'Sign In',
        onClick: navigateToSignIn,
        noAuth: true,
        auth: false
    },
    {
        label: 'Sign Up',
        onClick: navigateToSignUp,
        noAuth: true,
        auth: false
    },
    {
        label: 'Logout',
        onClick: () => {},
        noAuth: false,
        auth: true
    }
];

const Drawer: FC<DrawerContentComponentProps> = () => {
    const items = data.filter(item => !item.auth);

    return (
        <Container>
            <CloseIconContainer>
                <TouchableOpacity onPress={drawer.close}>
                    <CloseIcon height="25px" />
                </TouchableOpacity>
            </CloseIconContainer>
            <OptionContainer>
                {items.map(item => {
                    const { onClick, label } = item;
                    return <DrawerOption key={label} label={label} onClick={onClick} />;
                })}
            </OptionContainer>
        </Container>
    );
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

export default Drawer;
