import React, { FC, useState, useEffect } from 'react';
import { Animated, NativeSyntheticEvent, TextInputEndEditingEventData, View } from 'react-native';
import styled from 'styled-components/native';
import { DefaultAnimatedText, DefaultText } from '../DefaultText';
import Colors from '../../utils/Colors';

enum InputState {
    ACTIVE = 1,
    INACTIVE = 0
}

const AnimationDuration = 200;

type Props = {
    label: string;
    onChangeText: (text: string) => void;
    type?: 'normal' | 'email' | 'password';
    defaultValue?: string;
    onEndEditing?: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
    error?: string;
};

const TextInput: FC<Props> = ({
    label,
    onChangeText,
    type = 'normal',
    defaultValue,
    onEndEditing,
    error = ''
}: Props) => {
    const [inputState, setInputState] = useState({
        text: defaultValue != null ? defaultValue : '',
        active: false
    });
    const [labelAnimation] = useState(
        new Animated.Value(inputState.text === '' ? InputState.INACTIVE : InputState.ACTIVE)
    );

    useEffect(() => {
        if (inputState.active && inputState.text === '') {
            Animated.timing(labelAnimation, {
                toValue: InputState.ACTIVE,
                duration: AnimationDuration
            }).start();
        } else if (!inputState.active && inputState.text === '') {
            Animated.timing(labelAnimation, {
                toValue: InputState.INACTIVE,
                duration: AnimationDuration
            }).start();
        }
    }, [inputState.active, inputState.text, labelAnimation]);

    const labelStyle = {
        transform: [
            {
                translateY: labelAnimation.interpolate({
                    inputRange: [InputState.INACTIVE, InputState.ACTIVE],
                    outputRange: [27, 0]
                })
            }
        ]
    };
    const borderBottomColor = {
        borderBottomColor: labelAnimation.interpolate({
            inputRange: [InputState.INACTIVE, InputState.ACTIVE],
            outputRange: [Colors.PRIMARY70, Colors.PRIMARY]
        })
    };

    const keyboardType = type === 'email' ? 'email-address' : 'default';
    const secureTextEntry = type === 'password';
    let autoCompleteType: 'off' | 'email' | 'password';
    if (type === 'normal') autoCompleteType = null;
    if (type === 'email') autoCompleteType = 'email';
    if (type === 'password') autoCompleteType = 'password';

    return (
        <View>
            <Label style={labelStyle}>{label}</Label>
            <InputContainer style={borderBottomColor}>
                <Input
                    value={inputState.text}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    autoCompleteType={autoCompleteType}
                    onChangeText={text => {
                        setInputState({
                            ...inputState,
                            text,
                            active: true
                        });
                        onChangeText(text);
                    }}
                    onFocus={() =>
                        setInputState({
                            ...inputState,
                            active: true
                        })
                    }
                    onEndEditing={e => {
                        setInputState({
                            ...inputState,
                            text: e.nativeEvent.text.trim(),
                            active: false
                        });
                        if (onEndEditing) {
                            onEndEditing(e);
                        }
                    }}
                />
            </InputContainer>
            {error !== '' && <ErrorLabel>{error}</ErrorLabel>}
        </View>
    );
};

const Label = styled(DefaultAnimatedText)`
    height: 22px;
    color: ${Colors.WHITE70};
`;

const Input = styled.TextInput`
    font-size: 16px;
    color: ${Colors.WHITE};
    padding: 5px 0;
`;

const InputContainer = styled(Animated.View)`
    border-bottom-width: 2px;
`;

const ErrorLabel = styled(DefaultText)`
    color: ${Colors.RED_LIGHT};
    font-size: 14px;
    margin-top: 5px;
`;

export default TextInput;
