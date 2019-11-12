import React, {FC} from "react";
import styled from 'styled-components/native'
import {Text} from "react-native";
import {Colors} from "../../utils/colors";
import {CloseIcon} from '../icons'


export const Drawer: FC = () => {
    return <Container>
        <CloseIconContainer>
            <CloseIcon height="25px"/>
        </CloseIconContainer>

        <Text>sdfsf</Text>
    </Container>
};

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px 20px 20px 35px;
  background-color: ${Colors.SECONDARY};
`;

const CloseIconContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;
