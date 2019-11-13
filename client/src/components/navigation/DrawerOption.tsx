import React, {FC} from "react";
import styled from 'styled-components/native'
import {Colors} from "../../utils/Colors";
import {TouchableWithoutFeedback} from "react-native";

interface Props {
    label: String,
    path: String
}

export const DrawerOption: FC<Props> = ({label, path}) => {
    return (
        <TouchableWithoutFeedback onPress={() => {}}>
            <OptionContainer>
                <Option>{label}</Option>
            </OptionContainer>
        </TouchableWithoutFeedback>

    );
};

const OptionContainer = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Option = styled.Text`
  color: ${Colors.WHITE};
  font-size: 16px;
`;
