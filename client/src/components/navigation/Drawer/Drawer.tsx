import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { DrawerContentComponentProps } from 'react-navigation-drawer';
import Colors from '../../../utils/Colors';
import { CloseIcon } from '../../icons';
import DrawerOption from './DrawerOption';
import { drawer } from '../../../navigation/navigationService';
import {
    navigateToSignIn,
    navigateToSignUp,
    navigateToHome
} from '../../../navigation/navigationActions';
import { Store } from '../../../redux/store';
import { clearAuthToken } from '../../../redux/options/optionsActions';

type Props = DrawerContentComponentProps & {
    token: string;
    clearAuthTokenAction: typeof clearAuthToken;
};

const Drawer: FC<Props> = ({ token, clearAuthTokenAction }: Props) => {
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
            onClick: () => {
                setTimeout(clearAuthTokenAction, 250);
                navigateToHome();
            },
            noAuth: false,
            auth: true
        }
    ];

    const items = token ? data.filter(item => item.auth) : data.filter(item => item.noAuth);

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

const mapStateToProps = (state: Store) => {
    const {
        option: { token }
    } = state;

    return {
        token
    };
};

const mapDispatchToProps = {
    clearAuthTokenAction: clearAuthToken
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer);
