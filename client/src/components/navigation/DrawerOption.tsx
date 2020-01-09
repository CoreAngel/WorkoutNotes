import React, { FC } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { DefaultText } from '../DefaultText';
import Colors from '../../utils/Colors';

type Props = {
    label: string;
    path: string;
};

const DrawerOption: FC<Props> = ({ label, path }: Props) => {
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

const Option = styled(DefaultText)`
    color: ${Colors.WHITE};
`;

export default DrawerOption;
