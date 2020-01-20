import React, { FC } from 'react';
import styled from 'styled-components/native';
import Colors from '../../utils/Colors';
import { DefaultText } from '../DefaultText';

type Props = {
    label: string;
    onClick: () => void;
    color?: string;
};

const Button: FC<Props> = ({ label, onClick, color = Colors.PRIMARY }: Props) => {
    return (
        <TouchableButton color={color} onPress={onClick}>
            <Text>{label}</Text>
        </TouchableButton>
    );
};

type TouchableButtonProps = {
    color: string;
};

const TouchableButton = styled.TouchableOpacity<TouchableButtonProps>`
    background-color: ${({ color }) => color};
    padding: 8px 30px;
    border-radius: 3px;
`;

const Text = styled(DefaultText)`
    color: ${Colors.WHITE};
    text-align: center;
`;

export default Button;
