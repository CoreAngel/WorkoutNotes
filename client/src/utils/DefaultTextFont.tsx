import React from "react";
import styled from "styled-components/native";
import {Animated} from "react-native";

export const DefaultTextFont = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
`;

export const DefaultAnimatedTextFont = styled(Animated.Text)`
  font-family: 'Roboto';
  font-size: 16px;
`;
