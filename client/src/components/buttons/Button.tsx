import React, {FC} from "react";
import styled from "styled-components/native";
import {Colors} from "../../utils/Colors";

interface Props {
    label: string
    onClick: () => void
    color?: string
}

export const Button: FC<Props> = ({
    label,
    onClick,
    color = Colors.PRIMARY
}) => {
    const TouchableButton = touchableButton(color);

    return <TouchableButton onPress={onClick}>
        <Text>{label}</Text>
    </TouchableButton>
};

const touchableButton = (color) => styled.TouchableOpacity`
  background-color: ${color};
  padding: 8px 30px;
  border-radius: 3px;
`;

const Text = styled.Text`
  color: ${Colors.WHITE};
`;
