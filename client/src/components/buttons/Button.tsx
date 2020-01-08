import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Colors, DefaultTextFont } from '../../utils';

type Props = {
    label: string;
    onClick: () => void;
    color?: string;
};

const Button: FC<Props> = ({
    label,
    onClick,
    color = Colors.PRIMARY
}: Props) => {
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

const Text = styled(DefaultTextFont)`
    color: ${Colors.WHITE};
`;

export default Button;
