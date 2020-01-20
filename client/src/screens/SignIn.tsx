import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Colors from '../utils/Colors';
import TextInput from '../components/inputs/TextInput';
import Button from '../components/buttons/Button';
import { DefaultText } from '../components/DefaultText';
import { navigateToHome, navigateToSignUp } from '../navigation/navigationActions';
import ScrollContainerWithAvoidKeyboard from '../components/ScrollContainerWithAvoidKeyboard';
import { setAuthToken } from '../redux/options/optionsActions';
import { Login, loginRequest } from '../requests/auth';

type Props = {
    setAuthTokenAction: typeof setAuthToken;
};

const SignIn: FC<Props> = ({ setAuthTokenAction }: Props) => {
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const onChangeLogin = (text: string) => {
        setFormData({
            ...formData,
            login: text
        });
    };

    const onChangePassword = (text: string) => {
        setFormData({
            ...formData,
            password: text
        });
    };

    const onSignIn = async () => {
        const { login, password } = formData;
        const loginData: Login = {
            login,
            password
        };
        setLoader(true);
        try {
            const response = await loginRequest(loginData);
            const { status } = response;
            const body = await response.json();
            if (status === 200) {
                setAuthTokenAction(body.token);
                navigateToHome();
            } else if (status === 401) {
                setErrors(body.errors);
            }
        } catch (e) {
            setErrors(['An unknown error occurred']);
        } finally {
            setLoader(false);
        }
    };

    return (
        <ScrollContainerWithAvoidKeyboard>
            <Container>
                <InputContainer>
                    <TextInput label="Login" onChangeText={onChangeLogin} />
                </InputContainer>
                <InputContainer>
                    <TextInput label="Password" onChangeText={onChangePassword} type="password" />
                </InputContainer>
                {errors
                    .map((error, index) => ({ error, index }))
                    .map(({ index, error }) => (
                        <ErrorText key={index}>{error}</ErrorText>
                    ))}
                {loader ? (
                    <ActivityIndicator size="large" color={Colors.PRIMARY} />
                ) : (
                    <ButtonsContainer>
                        <ButtonFullWidth label="SIGN IN" onClick={onSignIn} />
                        <Divider>or</Divider>
                        <TouchableOpacity onPress={navigateToSignUp}>
                            <SubText>Sign Up</SubText>
                        </TouchableOpacity>
                    </ButtonsContainer>
                )}
            </Container>
        </ScrollContainerWithAvoidKeyboard>
    );
};

const Container = styled.View`
    padding: 30px 20px 20px 20px;
`;

const InputContainer = styled.View`
    margin-bottom: 30px;
`;

const ButtonFullWidth = styled(Button)`
    width: 100%;
    border-radius: 0;
`;

const ButtonsContainer = styled.View`
    margin-top: 10px;
`;

const Divider = styled(DefaultText)`
    color: ${Colors.WHITE70};
    font-size: 14px;
    text-align: center;
    margin: 10px 0;
`;

const SubText = styled(DefaultText)`
    text-align: center;
    color: ${Colors.PRIMARY};
`;

const ErrorText = styled(DefaultText)`
    color: ${Colors.RED_LIGHT};
    font-size: 14px;
`;

const mapDispatchToProps = {
    setAuthTokenAction: setAuthToken
};

export default connect(
    null,
    mapDispatchToProps
)(SignIn);
