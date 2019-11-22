import React, { FC, useState, useEffect } from 'react';
import {
    Animated,
    NativeSyntheticEvent,
    TextInputEndEditingEventData,
    View
} from 'react-native';
import styled from 'styled-components/native';
import { DefaultAnimatedTextFont, DefaultTextFont, Colors } from '../../utils';

enum InputState {
    ACTIVE = 1,
    INACTIVE = 0
}

const AnimationDuration = 200;

interface Props {
    label: string;
    onChangeText: (text: string) => void;
    onEndEditing?: (
        e: NativeSyntheticEvent<TextInputEndEditingEventData>
    ) => void;
    error?: string;
}

const TextInput: FC<Props> = ({
    label,
    onChangeText,
    onEndEditing,
    error = ''
}: Props) => {
    const [inputState, setInputState] = useState({
        text: '',
        active: false
    });
    const [labelAnimation] = useState(new Animated.Value(InputState.INACTIVE));

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

    return (
        <View>
            <Label style={labelStyle}>{label}</Label>
            <InputContainer style={borderBottomColor}>
                <Input
                    value={inputState.text}
                    onChangeText={text => {
                        setInputState({
                            ...inputState,
                            text,
                            active: true
                        });
                        if (onChangeText) {
                            onChangeText(text);
                        }
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

const Label = styled(DefaultAnimatedTextFont)`
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

const ErrorLabel = styled(DefaultTextFont)`
    color: ${Colors.RED_LIGHT};
    font-size: 14px;
    margin-top: 5px;
`;

export default TextInput;
