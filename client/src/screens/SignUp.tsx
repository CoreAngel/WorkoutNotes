import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors';
import TextInput from '../components/inputs/TextInput';
import Button from '../components/buttons/Button';
import { DefaultText } from '../components/DefaultText';
import { navigateToSignIn } from '../navigation/navigationActions';

const SignUp: FC = () => {
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onChangeName = (text: string) => {
        setFormData({
            ...formData,
            name: text
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

    const onSignUp = () => {
        setLoader(true);
    };

    return (
        <Container>
            <InputContainer>
                <TextInput label="Name" onChangeText={onChangeName} />
            </InputContainer>
            <InputContainer>
                <TextInput label="Email" onChangeText={onChangeEmail} type="email" />
            </InputContainer>
            <InputContainer>
                <TextInput label="Password" onChangeText={onChangePassword} type="password" />
            </InputContainer>
            {loader ? (
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            ) : (
                <View>
                    <ButtonFullWidth label="SIGN UP" onClick={onSignUp} />
                    <Divider>or</Divider>
                    <TouchableOpacity onPress={navigateToSignIn}>
                        <SubText>Sign In</SubText>
                    </TouchableOpacity>
                </View>
            )}
        </Container>
    );
};

const Container = styled.View`
    margin: 10px 20px;
    padding: 30px 20px 20px 20px;
    background-color: ${Colors.SECONDARY};
`;

const InputContainer = styled.View`
    margin-bottom: 30px;
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

export default SignUp;
