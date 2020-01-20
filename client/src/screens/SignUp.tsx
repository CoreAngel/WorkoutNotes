import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Colors from '../utils/Colors';
import TextInput from '../components/inputs/TextInput';
import Button from '../components/buttons/Button';
import ScrollContainerWithAvoidKeyboard from '../components/ScrollContainerWithAvoidKeyboard';
import { DefaultText } from '../components/DefaultText';
import { navigateToSignIn, navigateToHome } from '../navigation/navigationActions';
import { registerRequest, Reqister } from '../requests/auth';
import { setAuthToken } from '../redux/options/optionsActions';

type Props = {
    setAuthTokenAction: typeof setAuthToken;
};

const SignUp: FC<Props> = ({ setAuthTokenAction }: Props) => {
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onChangeLogin = (text: string) => {
        setFormData({
            ...formData,
            login: text
        });
    };

    const onChangeEmail = (text: string) => {
        setFormData({
            ...formData,
            email: text
        });
    };

    const onChangePassword = (text: string) => {
        setFormData({
            ...formData,
            password: text
        });
    };

    const onChangeConfirmPassword = (text: string) => {
        setFormData({
            ...formData,
            confirmPassword: text
        });
    };

    const onSignUp = async () => {
        const { login, email, password, confirmPassword } = formData;
        const registerData: Reqister = {
            login,
            email,
            password,
            confirmPassword
        };
        setLoader(true);
        try {
            const response = await registerRequest(registerData);
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
                    <TextInput label="Email" onChangeText={onChangeEmail} type="email" />
                </InputContainer>
                <InputContainer>
                    <TextInput label="Password" onChangeText={onChangePassword} type="password" />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        label="Confirm password"
                        onChangeText={onChangeConfirmPassword}
                        type="password"
                    />
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
                        <ButtonFullWidth label="SIGN UP" onClick={onSignUp} />
                        <Divider>or</Divider>
                        <TouchableOpacity onPress={navigateToSignIn}>
                            <SubText>Sign In</SubText>
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

const ButtonsContainer = styled.View`
    margin-top: 10px;
`;

const ButtonFullWidth = styled(Button)`
    width: 100%;
    border-radius: 0;
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
)(SignUp);
