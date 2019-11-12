import React from "react";
import { Navigation } from './src/navigation'
import styled from 'styled-components/native'
import {Colors} from "./src/utils/colors";
import Constants from 'expo-constants'
import {SafeAreaView} from 'react-navigation';
import {Platform} from "react-native";

if (Platform.OS === 'android') {
    // @ts-ignore
    SafeAreaView.setStatusBarHeight(0);
}

export default () => {
  return (
      <AppContainer>
        <Navigation/>
      </AppContainer>
  )
};

const AppContainer = styled.View`
  flex: 1;
  backgroundColor: ${Colors.SECONDARY};
  padding-top: ${Constants.statusBarHeight};
`;
