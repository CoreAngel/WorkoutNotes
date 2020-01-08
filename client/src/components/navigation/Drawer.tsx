import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { DrawerContentComponentProps } from 'react-navigation-drawer';
import { Colors } from '../../utils';
import { CloseIcon } from '../icons';
import DrawerOption from './DrawerOption';

const data = [
    {
        label: 'Measurement',
        path: ''
    },
    {
        label: 'Metrics',
        path: ''
    },
    {
        label: 'Sign in',
        path: '',
        auth: false
    },
    {
        label: 'Sign up',
        path: '',
        auth: false
    },
    {
        label: 'Logout',
        path: '',
        auth: true
    }
];

const Drawer: FC<DrawerContentComponentProps> = () => {
    return (
        <Container>
            <CloseIconContainer>
                <TouchableOpacity onPress={null}>
                    <CloseIcon height="25px" />
                </TouchableOpacity>
            </CloseIconContainer>
            <OptionContainer>
                {data
                    .filter(item => item.auth === undefined || item.auth === false)
                    .map(item => {
                        return (
                            <DrawerOption key={item.label} label={item.label} path={item.path} />
                        );
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
