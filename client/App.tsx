import React from "react";
import Navigation from './src/navigation'
import styled from 'styled-components/native'
import {Colors} from "./src/utils/Colors";
import Constants from 'expo-constants'
import {SafeAreaView, SafeAreaViewProps} from 'react-navigation';
import {Platform, YellowBox} from "react-native";

interface SafeAreaWithSetStatusBarHeight<SafeAreaViewProps> extends React.ComponentClass<SafeAreaViewProps> {
    setStatusBarHeight(height: number): void
}

if (Platform.OS === 'android') {
    (SafeAreaView as SafeAreaWithSetStatusBarHeight<SafeAreaViewProps>).setStatusBarHeight(0);
}

YellowBox.ignoreWarnings(['Require cycle: src\\navigation\\index.tsx']);

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
