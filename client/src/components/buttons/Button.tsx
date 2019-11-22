import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Colors, DefaultTextFont } from '../../utils';

interface Props {
    label: string;
    onClick: () => void;
    color?: string;
}

const Button: FC<Props> = ({
    label,
    onClick,
    color = Colors.PRIMARY
}: Props) => {
    return (
        <TouchableButton
            styledObj={{
                color
            }}
            onPress={onClick}
        >
            <Text>{label}</Text>
        </TouchableButton>
    );
};

interface TouchableButtonProps {
    styledObj: {
        color: string;
    };
}

const TouchableButton = styled.TouchableOpacity<TouchableButtonProps>`
    background-color: ${({ styledObj }) => styledObj.color};
    padding: 8px 30px;
    border-radius: 3px;
`;

const Text = styled(DefaultTextFont)`
    color: ${Colors.WHITE};
`;

export default Button;
